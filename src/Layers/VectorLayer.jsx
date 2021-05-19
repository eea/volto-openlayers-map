import { useContext, useEffect } from 'react';
import MapContext from '../Map/MapContext';

const VectorLayer = ({ source, style, zIndex = 0 }) => {
  const { map, openlayers } = useContext(MapContext);

  useEffect(() => {
    if (!map) return;

    let vectorLayer = new openlayers.layer.Vector({
      source,
      style,
    });

    map.addLayer(vectorLayer);
    vectorLayer.setZIndex(zIndex);

    return () => {
      if (map) {
        map.removeLayer(vectorLayer);
      }
    };
    /* eslint-disable-next-line */
  }, [map, source]);

  return null;
};

export default VectorLayer;
