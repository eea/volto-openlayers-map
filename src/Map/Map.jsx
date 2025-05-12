import React from 'react';
import isEqual from 'lodash/isEqual';
import MapContext from './MapContext';
import { getOptions, getEvents, assign } from '../helpers';
import { injectLazyLibs } from '@plone/volto/helpers/Loadable/Loadable';
import '../less/map.less';

/**
 * Implementation of ol/Map https://openlayers.org/en/latest/apidoc/module-ol_Map-Map.html
 *
 * example:
 * <Map view={{center: [0, 0], zoom: 2}}>
 *   <Layers>
 *     <Layer.Tile source={new ol.source.OSM()} />
 *     <Layer.Vector options={}/>
 *   </Layers>
 *   <Controls />
 *   <Interactions />
 *   <Overlays />
 * </Map>
 */

// const { ol, control, interaction } = openlayers;
class Map extends React.PureComponent {
  mapRef = undefined;

  controls = [];
  interactions = [];
  layers = [];
  overlays = [];

  controlsDefaults = {};
  interactionsDefaults = {};

  defaultViewOptions = {
    center: undefined,
    maxZoom: undefined,
    minZoom: undefined,
    resolution: undefined,
    rotation: undefined,
    zoom: undefined,
    extent: undefined,
  };

  defaultOptions = {
    renderer: undefined,
    keyboardEventTarget: undefined,
    maxTilesLoading: undefined,
    moveTolerance: undefined,
    pixelRatio: undefined,
    view:
      typeof window !== 'undefined'
        ? new this.props.ol.View({ center: [0, 0], zoom: 3 })
        : null,
    controls: undefined,
    interactions: undefined,
    layers: undefined,
    overlays: undefined,
  };

  options = {};

  events = {
    'change:layerGroup': undefined,
    'change:size': undefined,
    'change:target': undefined,
    'change:view': undefined,
    change: undefined,
    click: undefined,
    dblclick: undefined,
    error: undefined,
    moveend: undefined,
    movestart: undefined,
    pointerdrag: undefined,
    pointermove: undefined,
    postcompose: undefined,
    postrender: undefined,
    precompose: undefined,
    propertychange: undefined,
    rendercomplete: undefined,
    singleclick: undefined,
  };

  constructor(props) {
    super(props);
    this.init = this.init.bind(this);
    this.addControl = this.addControl.bind(this);
    this.addInteraction = this.addInteraction.bind(this);
    this.addLayer = this.addLayer.bind(this);
    this.addOverlay = this.addOverlay.bind(this);
    this.setInteractionsDefaults = this.setInteractionsDefaults.bind(this);
    this.setControlsDefaults = this.setControlsDefaults.bind(this);
    this.addOverlay = this.addOverlay.bind(this);
    this.updateMap = this.updateMap.bind(this);
    this.updateView = this.updateView.bind(this);
    this.map = null;
    this.mapRendered = false;
    this.state = { map: null };
  }

  init() {
    let options = getOptions(assign(this.defaultOptions, this.props));
    // Set target
    options.target = options.target || this.mapRef;
    // Set view
    if (!(options.view instanceof this.props.ol.View)) {
      options.view = new this.props.ol.View(options.view);
    }
    // Set controls
    options.controls = this.props.olControl
      .defaults(this.controlsDefaults)
      .extend(this.controls);
    // Set interactions
    options.interactions = this.props.olInteraction
      .defaults(this.interactionsDefaults)
      .extend(this.interactions);
    // Set layers
    options.layers = this.layers;
    // Set overlays
    options.overlays = this.overlays;
    // Initiate map
    this.map = new this.props.ol.Map(options);
    this.mapRendered = true;
    // Set events
    let events = getEvents(this.events, this.props);
    for (let event in events) {
      this.map.on(event, events[event]);
    }

    // this is needed, to cause the MapContext to refresh with a new value and the proper reference to this.map
    this.setState({ map: this.map });
  }

  addControl(control) {
    this.controls.push(control);
  }

  addInteraction(interaction) {
    this.interactions.push(interaction);
  }

  addLayer(layer) {
    this.layers.push(layer);
  }

  addOverlay(overlay) {
    this.overlays.push(overlay);
  }

  setControlsDefaults(data) {
    this.controlsDefaults = { ...data };
  }

  setInteractionsDefaults(data) {
    this.interactionsDefaults = { ...data };
  }

  updateMap() {
    if (!this.map) return;
    Object.keys(this.options).forEach((key) => {
      const prevValue = this.map.get(key);
      const value = this.options[key];
      if (key === 'view') {
        this.updateView();
        return;
      }
      if (value === prevValue) return;
      this.map.set(key, this.options[key]);
    });
  }

  updateView() {
    const viewOptions = getOptions(
      assign(this.defaultViewOptions, this.options.view || {}),
    );

    const view = this.map.getView();

    Object.keys(viewOptions).forEach((key) => {
      const prevValue = view.get(key);
      const value = viewOptions[key];
      if (value === prevValue) return;
      if (key === 'extent') {
        view.fit(value);
        return;
      }
      view.set(key, value);
    });
  }

  componentDidMount() {
    if (!this.mapRef) return;
    this.init();
  }

  componentWillUnmount() {
    if (!this.map) return;
    this.map.dispose();
    this.map = null;
    this.mapRendered = false;
  }

  componentDidUpdate() {
    const newOptions = getOptions(assign(this.defaultOptions, this.props));
    if (!isEqual(newOptions, this.options)) {
      this.options = newOptions;
      this.updateMap();
    }
  }

  render() {
    const MapContent = this.props.children;

    return (
      <MapContext.Provider
        value={{
          map: this.map,
          mapRendered: this.mapRendered,
          controls: this.controls,
          interactions: this.interactions,
          layers: this.layers,
          overlays: this.overlays,
          addControl: this.addControl,
          addInteraction: this.addInteraction,
          addLayer: this.addLayer,
          addOverlay: this.addOverlay,
          setControlsDefaults: this.setControlsDefaults,
          setInteractionsDefaults: this.setInteractionsDefaults,
        }}
      >
        <div className="ol-map-wrapper">
          <div className="ol-map" ref={(el) => (this.mapRef = el)}>
            {this.props.children?.render ? (
              <MapContent {...this.props} />
            ) : (
              this.props.children
            )}
          </div>
        </div>
      </MapContext.Provider>
    );
  }
}

export default injectLazyLibs(['ol', 'olInteraction', 'olControl'])(Map);
