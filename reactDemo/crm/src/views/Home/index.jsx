import './index.scss';
import { Outlet } from 'react-router-dom';
import Sidebar from './template/sidebar';
import Navigation from './template/navigation';

function Home() {
  console.log(222);
  return (
    <>
      <div className="app-container flex-row flex-between">
        <Sidebar></Sidebar>
        <div className="main-container">
          <Navigation></Navigation>
          <div className="content-view padding-small">
            <Outlet></Outlet>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
