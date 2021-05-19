let openlayers = {};

if (__CLIENT__) {
  openlayers = {
    ol: require('ol'),
    extent: require('ol/extent'),
    format: require('ol/format'),
    layer: require('ol/layer'),
    style: require('ol/style'),
    source: require('ol/source'),
    proj: require('ol/proj'),
  };
}

const applyConfig = (config) => {
  return config;
};

export { openlayers };

export default applyConfig;
