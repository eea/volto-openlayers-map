import React from 'react';
import { render } from '@testing-library/react';
import Interactions from './Interactions';

jest.mock('@eeacms/volto-openlayers-map/helpers', () => ({
  getOptions: jest.fn((options) => options),
  assign: jest.fn((target, source) => ({ ...target, ...source })),
}));

jest.mock('@eeacms/volto-openlayers-map/hocs', () => ({
  withMapContext: (Component) => Component,
}));

describe('Interactions Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders without crashing', () => {
    const props = {
      mapRendered: true,
      setInteractionsDefaults: jest.fn(),
    };

    expect(() => {
      render(<Interactions {...props} />);
    }).not.toThrow();
  });
});
