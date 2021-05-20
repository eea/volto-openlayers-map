import React from 'react';
import { getOptions } from '../helpers';

/**
 * Implementation of ol/interaction https://openlayers.org/en/latest/apidoc/module-ol_interaction.html
 *
 * example:
 * <Map view={{center: [0, 0], zoom: 2}}>
 *   <Interactions mouseWheelZoom={false} />
 * </Map>
 */
class Interactions extends React.Component {
  options = {
    altShiftDragRotate: undefined,
    onFocusOnly: undefined,
    doubleClickZoom: undefined,
    keyboard: undefined,
    mouseWheelZoom: undefined,
    shiftDragZoom: undefined,
    dragPan: undefined,
    pinchRotate: undefined,
    pinchZoom: undefined,
    zoomDelta: undefined,
    zoomDuration: undefined,
  };

  constructor(props) {
    super(props);
    this.options = getOptions(Object.assign(this.options, this.props));
  }

  render() {
    return <div>{this.props.children}</div>;
  }
}

export default Interactions;
