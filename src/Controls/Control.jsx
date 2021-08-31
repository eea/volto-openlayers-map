import React from 'react';
import cs from 'classnames';
import { openlayers } from '..';
import { getOptions } from '../helpers';
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
    this.options = getOptions(Object.assign(this.options, this.props));
    this.addControl = this.addControl.bind(this);
    this.removeControl = this.removeControl.bind(this);
    this.element = React.createRef();
  }

  addControl() {
    const { map } = this.props;
    if (!map) return;
    let options = {
      ...getOptions(Object.assign(this.options, this.props)),
      element: this.element.current,
    };
    this.control = new openlayers.control.Control(options);
    map.addControl(this.control);
  }

  removeControl() {
    const { map } = this.props;
    if (!map) return;
    map.removeControl(this.control);
  }

  componentDidMount() {
    this.addControl();
  }

  componentDidUpdate(prevProps) {
    const { map } = this.props;
    if (map && !prevProps.map) {
      this.addControl();
    } else if (map !== prevProps.map) {
      this.removeControl();
      this.addControl();
    }
  }

  render() {
    return (
      <div
        id={this.props.id}
        className={cs('ol-control', this.props.className)}
        style={{
          top: this.props.top || '0.5rem',
          left: this.props.left || '0.5rem',
        }}
        ref={this.element}
      >
        {this.props.children}
      </div>
    );
  }
}

export default withMapContext(Control);
