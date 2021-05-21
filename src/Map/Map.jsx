import React from 'react';
import MapContext from './MapContext';
import { Controls } from '../Controls';
import { Interactions } from '../Interactions';
import { openlayers } from '../index';
import { getOptions, getEvents, findChild, isEqual } from '../helpers';
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
class Map extends React.Component {
  mapRef = undefined;

  controls = [];
  interactions = [];
  layers = [];
  overlays = [];

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
    this.updateView = this.updateView.bind(this);
    this.state = {
      map: undefined,
    };
  }

  init() {
    let options = getOptions(Object.assign(this.options, this.props));

    options.target = options.target || this.mapRef;

    if (!(options.view instanceof ol.View)) {
      options.view = new ol.View(options.view);
    }

    let controls = findChild(this.props.children, Controls) || {};
    let interactions = findChild(this.props.children, Interactions) || {};

    options.controls = control.defaults(controls.props).extend(this.controls);
    options.interactions = interaction
      .defaults(interactions.props)
      .extend(this.interactions);

    options.layers = this.layers;
    options.overlays = this.overlays;

    this.setState({ map: new ol.Map(options) }, () => {
      let events = getEvents(this.events, this.props);
      for (let event in events) {
        this.state.map.on(event, events[event]);
      }
    });
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
    const view = this.state.map.getView();
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
    if (__SERVER__ || !this.state.map) return;
    this.state.map.setTarget(undefined);
  }

  componentWillReceiveProps(nextProps) {
    if (__SERVER__ || !this.state.map) return;
    this.updateView(nextProps);
  }

  render() {
    if (__SERVER__) return;
    return (
      <MapContext.Provider value={{ map: this.state.map }}>
        <div className="ol-map" ref={(el) => (this.mapRef = el)}>
          {this.props.children}
        </div>
      </MapContext.Provider>
    );
  }
}

export default Map;
