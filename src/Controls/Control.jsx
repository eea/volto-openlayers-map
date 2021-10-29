import React from 'react';
import { Portal } from 'react-portal';
import _uniqueId from 'lodash/uniqueId';
import cs from 'classnames';
import { openlayers } from '..';
import { getOptions, assign } from '../helpers';
import { withMapContext } from '../hocs';

class Control extends React.Component {
  control = undefined;

  options = {
    element: undefined,
    render: undefined,
    target: undefined,
  };

  constructor(props) {
    super(props);
    this.options = getOptions(assign(this.options, this.props));
    this.addControl = this.addControl.bind(this);
    this.element = React.createRef();
    this.state = {
      id: null,
    };
  }

  addControl() {
    const { map, mapRendered } = this.props;

    const id = this.props.id || _uniqueId('ol-overlay-');

    const element = document.createElement('div');
    element.setAttribute('id', id);
    element.setAttribute('class', cs('ol-control', this.props.className));
    element.style.top = this.props.top || '0.5rem';
    element.style.left = this.props.left || '0.5rem';

    let options = {
      ...getOptions(assign(this.options, this.props)),
      element,
    };

    this.control = new openlayers.control.Control(options);

    if (!mapRendered) {
      this.props.addControl(this.control);
    } else {
      map.addControl(this.control);
    }

    this.setState({ id });
  }

  componentDidMount() {
    this.addControl();
  }

  componentWillUnmount() {
    const { map, mapRendered } = this.props;
    if (__SERVER__ || !mapRendered) return;
    map.removeControl(this.control);
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

export default withMapContext(Control);
