/* eslint-disable react/jsx-filename-extension */

import loadable from '@loadable/component';
import { useLazyLibs } from '@plone/volto/helpers/Loadable/Loadable';

export const clientOnly = (factory) =>
  // If we are building the server bundle, return a promise that never resolves.
  // The loadable stays in a pending state, so injectLazyLibs renders null.
  loadable.lib(() => (__CLIENT__ ? factory() : new Promise(() => {})));

const applyConfig = (config) => {
  config.settings.loadables = {
    ...config.settings.loadables,

    ol: clientOnly(() => import('ol')),
    olControl: clientOnly(() => import('ol/control')),
    olCoordinate: clientOnly(() => import('ol/coordinate')),
    olExtent: clientOnly(() => import('ol/extent')),
    olFormat: clientOnly(() => import('ol/format')),
    olGeom: clientOnly(() => import('ol/geom')),
    olInteraction: clientOnly(() => import('ol/interaction')),
    olLayer: clientOnly(() => import('ol/layer')),
    olLoadingstrategy: clientOnly(() => import('ol/loadingstrategy')),
    olProj: clientOnly(() => import('ol/proj')),
    olSource: clientOnly(() => import('ol/source')),
    olStyle: clientOnly(() => import('ol/style')),
    olTilegrid: clientOnly(() => import('ol/tilegrid')),
    olOverlay: clientOnly(() => import('ol/Overlay')),
    olEvents: clientOnly(() => import('ol/events')),
    olCondition: clientOnly(() => import('ol/events/condition')),
    olRender: clientOnly(() => import('ol/render')),
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
