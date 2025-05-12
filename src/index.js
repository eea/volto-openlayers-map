import loadable from '@loadable/component';
import { useLazyLibs } from '@plone/volto/helpers/Loadable/Loadable';

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
    olOverlay: loadable.lib(() => import('ol/Overlay')),
    olEvents: loadable.lib(() => import('ol/events')),
    olCondition: loadable.lib(() => import('ol/events/condition')),
    olRender: loadable.lib(() => import('ol/render')),
  };
  return config;
};

const libraries = [
  'ol',
  'olCondition',
  'olControl',
  'olCoordinate',
  'olEvents',
  'olExtent',
  'olFormat',
  'olGeom',
  'olInteraction',
  'olLayer',
  'olLoadingstrategy',
  'olOverlay',
  'olProj',
  'olRender',
  'olSource',
  'olStyle',
  'olTilegrid',
];

export function withOpenLayers(WrappedComponent) {
  function WrapperComponent(props) {
    const loaded = useLazyLibs(libraries, { shouldRerender: true });
    const ol = {
      ol: loaded.ol,
      condition: loaded.olCondition,
      control: loaded.olControl,
      coordinate: loaded.olCoordinate,
      events: loaded.olEvents,
      extent: loaded.olExtent,
      format: loaded.olFormat,
      geom: loaded.olGeom,
      interaction: loaded.olInteraction,
      layer: loaded.olLayer,
      loadingstrategy: loaded.olLoadingstrategy,
      Overlay: loaded.olOverlay?.default,
      proj: loaded.olProj,
      render: loaded.olRender,
      source: loaded.olSource,
      style: loaded.olStyle,
      tilegrid: loaded.olTilegrid,
    };
    const isLoaded = Object.keys(loaded).length === libraries.length;
    return isLoaded ? <WrappedComponent {...props} ol={ol} /> : null;
  }

  return WrapperComponent;
}

export default applyConfig;
