import React from 'react';
import { getOptions, assign } from '../helpers';
import { withMapContext } from '../hocs';
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

  componentDidMount() {
    const { mapRendered, setControlsDefaults } = this.props;

    if (!mapRendered) {
      setControlsDefaults(getOptions(assign(this.options, this.props)));
    }
  }

  render() {
    return <>{this.props.children}</>;
  }
}

export default withMapContext(Controls);
