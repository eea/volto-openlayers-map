import { useContext, useEffect } from 'react';
import MapContext from '../Map/MapContext';

const TileLayer = ({ source, zIndex = 0 }) => {
  const { map, openlayers } = useContext(MapContext);
  const { layer } = openlayers;

  useEffect(() => {
    if (!map) return;

    let tileLayer = new layer.Tile({
      source,
      zIndex,
    });

    map.addLayer(tileLayer);
    tileLayer.setZIndex(zIndex);

    return () => {
      if (map) {
        map.removeLayer(tileLayer);
      }
    };
    /* eslint-disable-next-line */
  }, [map]);

  return null;
};

export default TileLayer;
