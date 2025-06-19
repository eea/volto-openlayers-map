import React from 'react';
import { render, screen } from '@testing-library/react';
import withMapContext, { useMapContext } from './withMapContext';
import { MapContext } from '../Map';

// Mock component to test the HOC
const TestComponent = React.forwardRef(
  ({ testProp, mapData, mapInstance, ...rest }, ref) => (
    <div ref={ref} {...rest} data-testid="test-component">
      <span data-testid="test-prop">{testProp}</span>
      <span data-testid="map-data">{mapData}</span>
      <span data-testid="map-instance">{mapInstance}</span>
    </div>
  ),
);

// Component to test useMapContext hook
const HookTestComponent = () => {
  const context = useMapContext();
  return (
    <div data-testid="hook-component">
      <span data-testid="hook-map-data">{context?.mapData}</span>
      <span data-testid="hook-map-instance">{context?.mapInstance}</span>
    </div>
  );
};

describe('withMapContext', () => {
  const mockMapContext = {
    mapData: 'test-map-data',
    mapInstance: 'test-map-instance',
    layers: ['layer1', 'layer2'],
    controls: ['control1'],
  };

  const WrappedComponent = withMapContext(TestComponent);

  it('should render wrapped component with map context props', () => {
    render(
      <MapContext.Provider value={mockMapContext}>
        <WrappedComponent testProp="test-value" />
      </MapContext.Provider>,
    );

    expect(screen.getByTestId('test-component')).toBeTruthy();
    expect(screen.getByTestId('test-prop').textContent).toBe('test-value');
    expect(screen.getByTestId('map-data').textContent).toBe('test-map-data');
    expect(screen.getByTestId('map-instance').textContent).toBe(
      'test-map-instance',
    );
  });

  it('should pass through original props along with context', () => {
    render(
      <MapContext.Provider value={mockMapContext}>
        <WrappedComponent
          testProp="original-prop"
          className="test-class"
          data-custom="custom-value"
        />
      </MapContext.Provider>,
    );

    const component = screen.getByTestId('test-component');
    expect(component.className).toContain('test-class');
    expect(component.getAttribute('data-custom')).toBe('custom-value');
    expect(screen.getByTestId('test-prop').textContent).toBe('original-prop');
  });
});

describe('useMapContext', () => {
  const mockMapContext = {
    mapData: 'hook-map-data',
    mapInstance: 'hook-map-instance',
  };

  it('should return map context when used within MapContext.Provider', () => {
    render(
      <MapContext.Provider value={mockMapContext}>
        <HookTestComponent />
      </MapContext.Provider>,
    );

    expect(screen.getByTestId('hook-map-data').textContent).toBe(
      'hook-map-data',
    );
    expect(screen.getByTestId('hook-map-instance').textContent).toBe(
      'hook-map-instance',
    );
  });

  it('should return undefined when used outside MapContext.Provider', () => {
    render(<HookTestComponent />);

    expect(screen.getByTestId('hook-map-data').textContent).toBe('');
    expect(screen.getByTestId('hook-map-instance').textContent).toBe('');
  });
});

describe('withMapContext integration', () => {
  it('should handle multiple context updates', () => {
    const TestContextComponent = ({ mapData }) => (
      <div data-testid="context-update">{mapData}</div>
    );

    const WrappedContextComponent = withMapContext(TestContextComponent);

    const { rerender } = render(
      <MapContext.Provider value={{ mapData: 'initial-data' }}>
        <WrappedContextComponent />
      </MapContext.Provider>,
    );

    expect(screen.getByTestId('context-update').textContent).toBe(
      'initial-data',
    );

    rerender(
      <MapContext.Provider value={{ mapData: 'updated-data' }}>
        <WrappedContextComponent />
      </MapContext.Provider>,
    );

    expect(screen.getByTestId('context-update').textContent).toBe(
      'updated-data',
    );
  });
});
