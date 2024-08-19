import { useEffect } from 'react';
import { useNavigate, useLocation, useMatches } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addBrowsing, removeBrowsing, updateTabValue } from '@/store/common';
import { Tabs } from 'antd';

const Navigation = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const matches = useMatches();

  const currentPath = location.pathname;
  const routeInfo = matches.find((e) => e.pathname === currentPath);

  useEffect(() => {
    dispatch(addBrowsing(routeInfo));
    dispatch(updateTabValue(routeInfo));
  }, [currentPath, routeInfo]);

  const items = useSelector((state) => state.commonSlice.browsingLst);
  const activeKey = useSelector((state) => state.commonSlice.tabValue);
  const onChange = (key) => {
    const tab = items.find((e) => e.key === key);
    tab && navigate(tab.path);
  };
  const editTabs = (targetKey, action) => {
    if (action === 'remove') {
      const index = items.findIndex((e) => e.key === targetKey);
      dispatch(removeBrowsing({ index }));
      onChange(items[items.length - 2].key);
    }
  };
  return <Tabs activeKey={activeKey} tabBarStyle={{ marginBottom: '0px' }} type="editable-card" hideAdd items={items} onChange={onChange} onEdit={editTabs} />;
};

export default Navigation;
