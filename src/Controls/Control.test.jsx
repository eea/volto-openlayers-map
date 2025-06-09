import React from 'react';
import { render } from '@testing-library/react';
import Control from './Control';

jest.mock('react-portal', () => ({
  Portal: () => null,
}));

jest.mock('@plone/volto/helpers/Loadable/Loadable', () => ({
  injectLazyLibs: () => (Component) => Component,
}));

jest.mock('@eeacms/volto-openlayers-map/helpers', () => ({
  getOptions: jest.fn((options) => options),
  assign: jest.fn((target, source) => ({ ...target, ...source })),
}));

jest.mock('@eeacms/volto-openlayers-map/hocs', () => ({
  withMapContext: (Component) => Component,
}));

jest.mock('lodash/uniqueId', () => jest.fn(() => 'test-unique-id'));

describe('Control Component', () => {
  let mockElement;

  beforeEach(() => {
    jest.clearAllMocks();

    //dom element for mock
    mockElement = document.createElement('div');
    mockElement.setAttribute = jest.fn();
    jest.spyOn(document, 'createElement').mockReturnValue(mockElement);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('renders without crashing', () => {
    const props = {
      map: {
        addControl: jest.fn(),
        removeControl: jest.fn(),
      },
      mapRendered: true,
      addControl: jest.fn(),
      olControl: {
        Control: jest.fn().mockImplementation(() => ({})),
      },
    };

    expect(() => {
      render(<Control {...props} />);
    }).not.toThrow();
  });
});
