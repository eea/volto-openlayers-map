import loadable from '@loadable/component';

const applyConfig = (config) => {
  config.settings.loadables = {
    ...config.settings.loadables,

    ol: loadable.lib(() => import('ol')),
    olControl: loadable.lib(() => import('ol/control')),
    olCoordinate: loadable.lib(() => import('ol/coordinate')),
    olExtent: loadable.lib(() => import('ol/extent')),
    olFormat: loadable.lib(() => import('ol/format')),
    olGeom: loadable.lib(() => import('ol/geom')),
    olInteraction: loadable.lib(() => import('ol/interaction')),
    olLayer: loadable.lib(() => import('ol/layer')),
    olLoadingstrategy: loadable.lib(() => import('ol/loadingstrategy')),
    olProj: loadable.lib(() => import('ol/proj')),
    olSource: loadable.lib(() => import('ol/source')),
    olStyle: loadable.lib(() => import('ol/style')),
    olTilegrid: loadable.lib(() => import('ol/tilegrid')),
    olOverlay: loadable.lib(() => import('ol/Overlay').default),
    olEvents: loadable.lib(() => import('ol/events')),
    olCondition: loadable.lib(() => import('ol/events/condition')),
    olRender: loadable.lib(() => import('ol/render')),

    // olMapboxStyle: loadable.lib(() => import('ol-mapbox-style')),
  };
  return config;
};

export default applyConfig;
