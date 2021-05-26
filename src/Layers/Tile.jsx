import React from 'react';
import { MapContext } from '../Map';
import { openlayers } from '../index';
import { getOptions, getEvents } from '../helpers';

const { layer, source } = openlayers;

class Tile extends React.Component {
  layer = undefined;

  options = {
    className: undefined,
    extent: undefined,
    map: undefined,
    maxResolution: undefined,
    maxZoom: undefined,
    minResolution: undefined,
    minZoom: undefined,
    opacity: undefined,
    preload: undefined,
    source: undefined,
    useInterimTilesOnError: undefined,
    visible: undefined,
    zIndex: undefined,
  };

  events = {
    'change:extent': undefined,
    'change:maxResolution': undefined,
    'change:maxZoom': undefined,
    'change:minResolution': undefined,
    'change:minZoom': undefined,
    'change:opacity': undefined,
    'change:preload': undefined,
    'change:source': undefined,
    'change:useInterimTilesOnError': undefined,
    'change:visible': undefined,
    'change:zIndex': undefined,
    error: undefined,
    postrender: undefined,
    precompose: undefined,
    propertychange: undefined,
  };

  constructor(props) {
    super(props);
    this.addLayer = this.addLayer.bind(this);
    this.removeLayer = this.removeLayer.bind(this);
  }

  addLayer(map, props) {
    if (!map) return;
    let options = getOptions(Object.assign(this.options, props));
    let events = getEvents(this.events, props);
    options.source = options.source || new source.OSM();
    this.layer = new layer.Tile(options);
    map.addLayer(this.layer);

    for (let event in events) {
      this.layer.on(event, events[event]);
    }
  }

  removeLayer(map) {
    if (!map) return;
    map.removeLayer(this.layer);
  }

  componentDidMount() {
    this.addLayer(this.context.map);
  }

  componentWillReceiveProps(nextProps, nextContext) {
    const map = this.context.map || nextContext.map;
    if (
      // !isEqual(nextProps.props, this.props.props) ||
      nextContext.map !== this.context.map
    ) {
      this.removeLayer(map);
      this.addLayer(map, nextProps);
    }
  }

  componentWillUnmount() {
    this.removeLayer(this.context.map);
  }

  render() {
    return null;
  }
}

Tile.contextType = MapContext;

export default Tile;
