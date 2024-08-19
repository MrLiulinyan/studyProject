import './index.scss';
import { useRouteError, useNavigate } from 'react-router-dom';
import { Result, Button } from 'antd';
function Error() {
  const errorData = useRouteError();
  const navigate = useNavigate();
  const backHome = () => {
    navigate('/');
  };
  const message = errorData.statusText || errorData.message || 'Sorry, the page you visited does not exist.';
  return (
    <Result
      status="404"
      title="404"
      subTitle={message}
      extra={
        <Button type="primary" onClick={() => backHome()}>
          返回首页
        </Button>
      }></Result>
  );
}

export default Error;
