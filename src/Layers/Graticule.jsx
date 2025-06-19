import React from 'react';
import isEqual from 'lodash/isEqual';
import { injectLazyLibs } from '@plone/volto/helpers/Loadable/Loadable';
import { getOptions, getEvents, assign } from '../helpers';
import { withMapContext } from '../hocs';

class Graticule extends React.Component {
  layer = undefined;

  defaultOptions = {
    className: undefined,
    opacity: undefined,
    extent: undefined,
    map: undefined,
    maxResolution: undefined,
    maxLines: undefined,
    strokeStyle: undefined,
    targetSize: undefined,
    showLabels: undefined,
    lonLabelFormatter: undefined,
    latLabelFormatter: undefined,
    lonLabelPosition: undefined,
    latLabelPosition: undefined,
    lonLabelStyle: undefined,
    latLabelStyle: undefined,
    intervals: undefined,
    wrapX: undefined,
    maxZoom: undefined,
    minResolution: undefined,
    minZoom: undefined,
    renderBuffer: undefined,
    renderOrder: undefined,
    source: undefined,
    visible: undefined,
    zIndex: undefined,
  };

  options = {};

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
    this.options = getOptions(assign(this.defaultOptions, this.props));
    this.addLayer = this.addLayer.bind(this);
    this.updateLayer = this.updateLayer.bind(this);
  }

  addLayer() {
    const { mapRendered } = this.props;
    let events = getEvents(this.events, this.props);
    this.layer = new this.props.olLayer.Graticule(this.options);
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
    return null;
  }
}

export default injectLazyLibs(['olLayer'])(withMapContext(Graticule));
