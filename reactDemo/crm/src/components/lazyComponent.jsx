import { Suspense } from 'react';
// import PropTypes from 'prop-types';
import Loading from './loading';

function LazyComponent(props) {
  return (
    <Suspense fallback={<Loading />}>
      <props.childrenComponent />
    </Suspense>
  );
}

// LazyComponent.PropTypes = {
//   childrenComponent: PropTypes.func.isRequired,
// };

export default LazyComponent;
