import React from 'react';
import { render } from '@testing-library/react';
import Controls from './Controls';

jest.mock('@eeacms/volto-openlayers-map/helpers', () => ({
  getOptions: jest.fn((options) => options),
  assign: jest.fn((target, source) => ({ ...target, ...source })),
}));

jest.mock('@eeacms/volto-openlayers-map/hocs', () => ({
  withMapContext: (Component) => Component,
}));

describe('Controls Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders without crashing', () => {
    const props = {
      mapRendered: true,
      setControlsDefaults: jest.fn(),
    };

    expect(() => {
      render(<Controls {...props} />);
    }).not.toThrow();
  });
});
