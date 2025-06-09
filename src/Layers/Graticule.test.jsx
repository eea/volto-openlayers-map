import React from 'react';
import { render } from '@testing-library/react';
import Graticule from './Graticule';

jest.mock('lodash/isEqual', () => jest.fn(() => false));

jest.mock('@plone/volto/helpers/Loadable/Loadable', () => ({
  injectLazyLibs: () => (Component) => Component,
}));

jest.mock('@eeacms/volto-openlayers-map/helpers', () => ({
  getOptions: jest.fn((options) => options),
  getEvents: jest.fn(() => ({})),
  assign: jest.fn((target, source) => ({ ...target, ...source })),
}));

jest.mock('@eeacms/volto-openlayers-map/hocs', () => ({
  withMapContext: (Component) => Component,
}));

describe('Graticule Component', () => {
  let mockLayer;

  beforeEach(() => {
    jest.clearAllMocks();

    mockLayer = {
      on: jest.fn(),
      get: jest.fn(),
      set: jest.fn(),
      dispose: jest.fn(),
    };
  });

  it('renders without crashing', () => {
    const props = {
      mapRendered: true,
      addLayer: jest.fn(),
      olLayer: {
        Graticule: jest.fn(() => mockLayer),
      },
    };

    expect(() => {
      render(<Graticule {...props} />);
    }).not.toThrow();
  });

  it('renders null', () => {
    const props = {
      mapRendered: true,
      addLayer: jest.fn(),
      olLayer: {
        Graticule: jest.fn(() => mockLayer),
      },
    };

    const { container } = render(<Graticule {...props} />);
    expect(container.firstChild).toBe(null);
  });
});
