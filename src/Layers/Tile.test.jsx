import React from 'react';
import { render } from '@testing-library/react';
import Tile from './Tile';

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

describe('Tile Component', () => {
  let mockLayer;
  let mockSource;

  beforeEach(() => {
    jest.clearAllMocks();

    mockLayer = {
      on: jest.fn(),
      get: jest.fn(),
      set: jest.fn(),
      dispose: jest.fn(),
    };

    mockSource = {};
  });

  it('renders without crashing', () => {
    const props = {
      mapRendered: true,
      addLayer: jest.fn(),
      olLayer: {
        Tile: jest.fn(() => mockLayer),
      },
      olSource: {
        OSM: jest.fn(() => mockSource),
      },
    };

    expect(() => {
      render(<Tile {...props} />);
    }).not.toThrow();
  });

  it('renders empty string', () => {
    const props = {
      mapRendered: true,
      addLayer: jest.fn(),
      olLayer: {
        Tile: jest.fn(() => mockLayer),
      },
      olSource: {
        OSM: jest.fn(() => mockSource),
      },
    };

    const { container } = render(<Tile {...props} />);
    expect(container.textContent).toBe('');
  });
});
