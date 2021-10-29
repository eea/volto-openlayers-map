import React from 'react';
import { openlayers } from '..';
import { getOptions, getEvents, assign } from '../helpers';
import { withMapContext } from '../hocs';

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
    this.options = getOptions(assign(this.options, this.props));
    this.addLayer = this.addLayer.bind(this);
  }

  addLayer() {
    const { mapRendered } = this.props;
    let events = getEvents(this.events, this.props);
    this.options.source = this.options.source || new source.OSM();
    this.layer = new layer.Tile(this.options);
    for (let event in events) {
      this.layer.on(event, events[event]);
    }
    if (!mapRendered) {
      this.props.addLayer(this.layer);
    }
  }

  componentDidMount() {
    this.addLayer();
  }

  componentWillUnmount() {
    if (__SERVER__ || !this.layer) return;
    this.layer.dispose();
  }

  render() {
    return '';
  }
}

export default withMapContext(Tile);
