import React from 'react';
import isEqual from 'lodash/isEqual';
import { openlayers } from '..';
import { getOptions, getEvents, assign } from '../helpers';
import { withMapContext } from '../hocs';

const { layer } = openlayers;

class Image extends React.Component {
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
    'change:visible': undefined,
    'change:zIndex': undefined,
    error: undefined,
    postrender: undefined,
    precompose: undefined,
    propertychange: undefined,
  };

  constructor(props) {
    super(props);
    this.defaultOptions = this.options;
    this.options = getOptions(assign(this.options, this.props));
    this.addLayer = this.addLayer.bind(this);
    this.updateLayer = this.updateLayer.bind(this);
  }

  addLayer() {
    const { mapRendered } = this.props;
    let events = getEvents(this.events, this.props);
    this.layer = new layer.Image(this.options);
    for (let event in events) {
      this.layer.on(event, events[event]);
    }
    if (!mapRendered) {
      this.props.addLayer(this.layer);
    }
  }

  updateLayer() {
    if (!this.layer) return;
    Object.keys(this.options).forEach((key) => {
      const prevValue = this.layer.get(key);
      const value = this.options[key];
      if (value === prevValue) return;
      this.layer.set(key, this.options[key]);
    });
  }

  componentDidMount() {
    this.addLayer();
  }

  componentWillUnmount() {
    if (!this.layer) return;
    this.layer.dispose();
    this.layer = null;
  }

  componentDidUpdate() {
    const newOptions = getOptions(assign(this.defaultOptions, this.props));
    if (!isEqual(newOptions, this.options)) {
      this.options = newOptions;
      this.updateLayer();
    }
  }

  render() {
    return '';
  }
}

export default withMapContext(Image);
