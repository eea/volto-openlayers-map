let openlayers = {};

if (__CLIENT__) {
  openlayers = {
    ol: require('ol'),
    control: require('ol/control'),
    extent: require('ol/extent'),
    format: require('ol/format'),
    interaction: require('ol/interaction'),
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
