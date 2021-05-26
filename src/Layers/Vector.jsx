import React from 'react';
import { MapContext } from '../Map';
import { openlayers } from '../index';
import { getOptions, getEvents } from '../helpers';

const { layer } = openlayers;

class Vector extends React.Component {
  layer = undefined;

  options = {
    className: undefined,
    declutter: undefined,
    extent: undefined,
    map: undefined,
    maxResolution: undefined,
    maxZoom: undefined,
    minResolution: undefined,
    minZoom: undefined,
    opacity: undefined,
    renderBuffer: undefined,
    renderOrder: undefined,
    source: undefined,
    style: undefined,
    updateWhileAnimating: undefined,
    updateWhileInteracting: undefined,
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
    'change:source': undefined,
    'change:visible': undefined,
    'change:zIndex': undefined,
    change: undefined,
    error: undefined,
    postrender: undefined,
    prerender: undefined,
    propertychange: undefined,
  };

  constructor(props) {
    super(props);
    this.addLayer = this.addLayer.bind(this);
    this.removeLayer = this.removeLayer.bind(this);
  }

  addLayer(map) {
    if (!map) return;
    let options = getOptions(Object.assign(this.options, this.props));
    let events = getEvents(this.events, this.props);
    this.layer = new layer.Vector(options);
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
      // !isEqual(nextProps, this.props) ||
      nextContext.map !== this.context.map
    ) {
      this.removeLayer(map);
      this.addLayer(map);
    }
  }

  componentWillUnmount() {
    this.removeLayer(this.context.map);
  }

  render() {
    return null;
  }
}

Vector.contextType = MapContext;

export default Vector;
