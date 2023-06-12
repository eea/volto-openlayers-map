import React from 'react';
import { Portal } from 'react-portal';
import _uniqueId from 'lodash/uniqueId';
import { getOptions, getEvents, assign } from '../helpers';
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
    this.options = getOptions(assign(this.options, this.props));
    this.addOverlay = this.addOverlay.bind(this);
    this.element = React.createRef();
    this.state = {
      id: null,
    };
  }

  addOverlay() {
    const { map, mapRendered } = this.props;
    const id = this.props.id || _uniqueId('ol-overlay-');

    const element = document.createElement('div');
    element.setAttribute('id', id);

    let options = {
      ...getOptions(assign(this.options, this.props)),
      element,
    };

    this.overlay = new Overlay(options);

    let events = getEvents(this.events, this.props);
    for (let event in events) {
      this.overlay.on(event, events[event]);
    }

    if (!mapRendered) {
      this.props.addOverlay(this.overlay);
    } else {
      map.addOverlay(this.overlay);
    }

    this.setState({ id });
  }

  componentDidMount() {
    this.addOverlay();
  }

  componentWillUnmount() {
    const { map, mapRendered } = this.props;
    if (!mapRendered) return;
    map.removeOverlay(this.overlay);
  }

  render() {
    return this.state.id && this.props.children ? (
      <Portal node={document.querySelector(`#${this.state.id}`)}>
        {this.props.children}
      </Portal>
    ) : (
      ''
    );
  }
}

export default withMapContext(Overlays);
