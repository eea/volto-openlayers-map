import React from 'react';
import { getOptions } from '../helpers';

/**
 * Implementation of ol/control https://openlayers.org/en/latest/apidoc/module-ol_control.html
 *
 * example:
 * <Map view={{center: [0, 0], zoom: 2}}>
 *   <Controls zoom={false} />
 * </Map>
 */
class Controls extends React.Component {
  options = {
    attribution: undefined,
    attributionOptions: undefined,
    rotate: undefined,
    rotateOptions: undefined,
    zoom: undefined,
    zoomOptions: undefined,
  };

  constructor(props) {
    super(props);
    this.options = getOptions(Object.assign(this.options, this.props));
  }

  render() {
    return <div>{this.props.children}</div>;
  }
}

export default Controls;
