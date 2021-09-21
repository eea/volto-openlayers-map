import React from 'react';
import { openlayers } from '..';
import { getOptions, getEvents } from '../helpers';
import { withMapContext } from '../hocs';

const { layer } = openlayers;

class WebGLPoints extends React.Component {
  layer = undefined;

  options = {
    className: undefined,
    declutter: undefined,
    extent: undefined,
    imageRatio: undefined,
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
    this.options = getOptions(Object.assign(this.options, this.props));
    this.addLayer = this.addLayer.bind(this);
    this.removeLayer = this.removeLayer.bind(this);
  }

  addLayer() {
    const { map } = this.props;
    if (!map) return;
    let events = getEvents(this.events, this.props);
    this.layer = new layer.WebGLPoints(this.options);
    map.addLayer(this.layer);

    for (let event in events) {
      this.layer.on(event, events[event]);
    }
  }

  removeLayer() {
    const { map } = this.props;
    if (!map) return;
    map.removeLayer(this.layer);
  }

  componentDidMount() {
    this.addLayer();
  }

  componentDidUpdate(prevProps) {
    const { map } = this.props;
    if (map && !prevProps.map) {
      this.addLayer();
    } else if (map !== prevProps.map) {
      this.removeLayer();
      this.addLayer();
    }
  }

  componentWillUnmount() {
    this.removeLayer();
  }

  render() {
    return null;
  }
}

export default withMapContext(WebGLPoints);
