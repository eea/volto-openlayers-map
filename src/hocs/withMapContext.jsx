import React, { useContext } from 'react';
import { MapContext } from '../Map';

export const useMapContext = () => useContext(MapContext);

const withMapContext = (WrappedComponent) =>
  React.forwardRef((props, ref) => {
    const context = useContext(MapContext);

    return <WrappedComponent {...props} {...context} ref={ref} />;
  });

export default withMapContext;
