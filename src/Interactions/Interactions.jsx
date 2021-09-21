import React from 'react';

/**
 * Implementation of ol/interaction https://openlayers.org/en/latest/apidoc/module-ol_interaction.html
 *
 * example:
 * <Map view={{center: [0, 0], zoom: 2}}>
 *   <Interactions mouseWheelZoom={false} />
 * </Map>
 */

const Interactions = (props) => {
  return <>{props.children}</>;
};

export default Interactions;
