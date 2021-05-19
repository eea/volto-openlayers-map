import React, { useRef, useState, useEffect } from 'react';
import MapContext from './MapContext';
import { openlayers } from '../index';
import '../less/map.less';

const Map = ({ children, zoom, center }) => {
  const mapRef = useRef();
  const [map, setMap] = useState(null);
  const { ol } = openlayers;

  // on component mount
  useEffect(() => {
    const mapObject = new ol.Map({
      target: mapRef.current,
      view: new ol.View({ zoom, center }),
      layers: [],
      controls: [],
      overlays: [],
    });

    setMap(mapObject);

    return () => {
      mapObject.setTarget(undefined);
    };
    /* eslint-disable-next-line */
  }, []);

  // zoom change handler
  useEffect(() => {
    if (!map) return;

    map.getView().setZoom(zoom);
    /* eslint-disable-next-line */
  }, [zoom]);

  // center change handler
  useEffect(() => {
    if (!map) return;

    map.getView().setCenter(center);
    /* eslint-disable-next-line */
  }, [center]);

  if (!__CLIENT__) return '';

  return (
    <MapContext.Provider value={{ map, openlayers }}>
      <div ref={mapRef} className="ol-map">
        {children}
      </div>
    </MapContext.Provider>
  );
};

export default Map;
