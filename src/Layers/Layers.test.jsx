import React from 'react';
import { render } from '@testing-library/react';
import Layers from './Layers';

describe('Layers Component', () => {
  it('renders without crashing', () => {
    expect(() => {
      render(<Layers />);
    }).not.toThrow();
  });

  it('renders children correctly', () => {
    const { container } = render(
      <Layers>
        <div>Test Child</div>
      </Layers>,
    );

    expect(container.textContent).toBe('Test Child');
  });
});
