import { Spin } from 'antd';
import PropTypes from 'prop-types';

const Loading = ({ size = 'small' }) => {
  return (
    <div className="loading">
      <div>加载中...</div>
      <Spin size={size}></Spin>
    </div>
  );
};

Loading.propTypes = {
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.oneOf(['default', 'small', 'large'])]),
};

export default Loading;
