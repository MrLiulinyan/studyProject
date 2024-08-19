import { useEffect } from 'react';
import { useLocation, useMatches } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addBrowsing, removeBrowsing } from '@/store/common';

const Guard = ({ children }) => {
  const location = useLocation();
  const matches = useMatches();
  const browsingLst = useSelector((state) => state.common.browsingLst);
  const dispatch = useDispatch();
  const currentPath = location.pathname;
  useEffect(() => {
    const routeInfo = matches.find((e) => e.pathname === currentPath);
    const item = browsingLst.find((e) => e.key === routeInfo.id);
    if (!item) dispatch(addBrowsing(routeInfo));
    return () => dispatch(removeBrowsing({ index: 1 }));
  }, [currentPath]);
  return children;
};

export default Guard;
