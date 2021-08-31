import React from 'react';
import { getOptions, getEvents } from '../helpers';
import { openlayers } from '..';
import { withMapContext } from '../hocs';

const { Overlay } = openlayers;

/**
 * Implementation of ol/interaction https://openlayers.org/en/latest/apidoc/module-ol_Overlay-Overlay.html
 *
 * example:
 * <Map view={{center: [0, 0], zoom: 2}}>
 *   <Overlays positioning="center-center">
 *      <h1>Hello World</h1>
 *   </Overlays>
 * </Map>
 */
class Overlays extends React.Component {
  overlay = undefined;

  options = {
    id: undefined,
    offset: undefined,
    position: undefined,
    positioning: undefined,
    stopEvent: undefined,
    insertFirst: undefined,
    autoPan: undefined,
    autoPanAnimation: undefined,
    autoPanMargin: undefined,
    autoPanOptions: undefined,
    className: undefined,
  };

  events = {};

  constructor(props) {
    super(props);
    this.options = getOptions(Object.assign(this.options, this.props));
    this.element = React.createRef();
  }

  addOverlay() {
    const { map } = this.props;
    if (!map) return;
    let options = {
      ...getOptions(Object.assign(this.options, this.props)),
      element: this.element.current,
    };
    let events = getEvents(this.events, this.props);
    this.overlay = new Overlay(options);
    map.addOverlay(this.overlay);

    for (let event in events) {
      this.overlay.on(event, events[event]);
    }
  }

  removeOverlay() {
    const { map } = this.props;
    if (!map) return;
    map.removeOverlay(this.overlay);
  }

  componentDidMount() {
    this.addOverlay();
  }

  componentDidUpdate(prevProps) {
    const { map } = this.props;
    if (map && !prevProps.map) {
      this.addOverlay();
    } else if (map !== prevProps.map) {
      this.removeOverlay();
      this.addOverlay();
    }
  }

  componentWillUnmount() {
    this.removeOverlay();
  }

  render() {
    const children = React.cloneElement(this.props.children, {
      ref: this.element,
    });
    return children;
  }
}

export default withMapContext(Overlays);
