let openlayers = {};

if (__CLIENT__) {
  openlayers = {
    ol: require('ol'),
    control: require('ol/control'),
    coordinate: require('ol/coordinate'),
    extent: require('ol/extent'),
    format: require('ol/format'),
    geom: require('ol/geom'),
    interaction: require('ol/interaction'),
    layer: require('ol/layer'),
    loadingstrategy: require('ol/loadingstrategy'),
    proj: require('ol/proj'),
    source: require('ol/source'),
    style: require('ol/style'),
    tilegrid: require('ol/tilegrid'),
    Overlay: require('ol/Overlay').default,
  };
}

const applyConfig = (config) => {
  return config;
};

export { openlayers };

export default applyConfig;
