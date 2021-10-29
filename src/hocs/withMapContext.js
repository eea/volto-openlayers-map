import React, { useContext } from 'react';
import { MapContext } from '../Map';

const withMapContext = (WrappedComponent) =>
  React.forwardRef((props, ref) => {
    const context = useContext(MapContext);

    return <WrappedComponent {...props} {...context} ref={ref} />;
  });

export default withMapContext;
