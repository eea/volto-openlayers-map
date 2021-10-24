import React from 'react';
import { getOptions, assign } from '../helpers';
import { withMapContext } from '../hocs';

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

  componentDidMount() {
    const { mapRendered, setInteractionsDefaults } = this.props;

    if (!mapRendered) {
      setInteractionsDefaults(getOptions(assign(this.options, this.props)));
    }
  }

  render() {
    return <>{this.props.children}</>;
  }
}

export default withMapContext(Interactions);
