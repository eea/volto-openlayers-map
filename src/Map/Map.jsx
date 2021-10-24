import React from 'react';
import MapContext from './MapContext';
import { openlayers } from '..';
import { getOptions, getEvents, isEqual, assign } from '../helpers';
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

const { ol, control, interaction } = openlayers;
class Map extends React.PureComponent {
  mapRef = undefined;

  controls = [];
  interactions = [];
  layers = [];
  overlays = [];

  controlsDefaults = {};
  interactionsDefaults = {};

  options = {
    renderer: undefined,
    keyboardEventTarget: undefined,
    maxTilesLoading: undefined,
    moveTolerance: undefined,
    pixelRation: undefined,
    view: new ol.View({ center: [0, 0], zoom: 3 }),
    controls: undefined,
    interactions: undefined,
    layers: undefined,
    overlays: undefined,
  };

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
    this.updateView = this.updateView.bind(this);
    this.map = null;
    this.mapRendered = false;
  }

  init() {
    let options = getOptions(assign(this.options, this.props));

    options.target = options.target || this.mapRef;

    if (!(options.view instanceof ol.View)) {
      options.view = new ol.View(options.view);
    }

    options.controls = control
      .defaults(this.controlsDefaults)
      .extend(this.controls);
    options.interactions = interaction
      .defaults(this.interactionsDefaults)
      .extend(this.interactions);

    options.layers = this.layers;
    options.overlays = this.overlays;

    this.map = new ol.Map(options);
    this.mapRendered = true;

    let events = getEvents(this.events, this.props);
    for (let event in events) {
      this.map.on(event, events[event]);
    }
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

  updateView(nextProps) {
    const {
      center = undefined,
      maxZoom = undefined,
      minZoom = undefined,
      resolution = undefined,
      rotation = undefined,
      zoom = undefined,
      extent = undefined,
    } = nextProps;
    const view = this.map.getView();
    // Update center
    if (
      center &&
      !isEqual(center, this.props.center) &&
      !isEqual(center, view.getCenter())
    ) {
      view.setCenter(center);
    }
    // Update max zoom
    if (
      maxZoom &&
      !isEqual(maxZoom, this.props.maxZoom) &&
      !isEqual(maxZoom, view.getMaxZoom())
    ) {
      view.setMaxZoom(maxZoom);
    }
    // Update min zoom
    if (
      minZoom &&
      !isEqual(minZoom, this.props.minZoom) &&
      !isEqual(minZoom, view.getMinZoom())
    ) {
      view.setMinZoom(minZoom);
    }
    // Update resolution
    if (
      resolution &&
      !isEqual(resolution, this.props.resolution) &&
      !isEqual(resolution, view.getResolution())
    ) {
      view.setResolution(resolution);
    }
    // Update rotation
    if (
      rotation &&
      !isEqual(rotation, this.props.rotation) &&
      !isEqual(rotation, view.getRotation())
    ) {
      view.setRotation(rotation);
    }
    // Update zoom
    if (
      zoom &&
      !isEqual(zoom, this.props.zoom) &&
      !isEqual(zoom, view.getZoom())
    ) {
      view.setZoom(zoom);
    }
    // Fit extent
    if (extent && !isEqual(extent, this.props.extent)) {
      view.fit(extent);
    }
  }

  componentDidMount() {
    if (__SERVER__ || !this.mapRef) return;
    this.init();
  }

  componentWillUnmount() {
    if (__SERVER__ || !this.map) return;
    this.map.dispose();
    this.map = null;
    this.mapRendered = false;
  }

  componentWillReceiveProps(nextProps) {
    if (__SERVER__ || !this.map) return;
    this.updateView(nextProps);
  }

  render() {
    const MapContent = this.props.children;

    if (__SERVER__) return;
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
        <div className="ol-map" ref={(el) => (this.mapRef = el)}>
          {this.props.children?.render ? (
            <MapContent {...this.props} />
          ) : (
            this.props.children
          )}
        </div>
      </MapContext.Provider>
    );
  }
}

export default Map;
