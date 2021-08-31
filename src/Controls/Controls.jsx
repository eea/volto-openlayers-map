import React from 'react';

/**
 * Implementation of ol/control https://openlayers.org/en/latest/apidoc/module-ol_control.html
 *
 * example:
 * <Map view={{center: [0, 0], zoom: 2}}>
 *   <Controls zoom={false} />
 * </Map>
 */

const Controls = (props) => {
  return <>{props.children}</>;
};

export default Controls;
