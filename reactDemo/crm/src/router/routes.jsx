import { lazy } from 'react';
import LazyComponent from '@/components/lazyComponent';
// const Home = lazy(() => import('@/views/Home'));
import Backlog from '@/views/Backlog';
import Customer from '@/views/Customer';
import Sales from '@/views/Sales';
import Marketing from '@/views/Marketing';
import Statistics from '@/views/Statistics';
import Other from '@/views/Other';
import Error from '@/views/Error';

const routes = [
  {
    id: '首页',
    path: '/',
    element: <LazyComponent childrenComponent={lazy(() => import('@/views/Home'))}></LazyComponent>,
    errorElement: <Error />,
    children: [
      {
        id: '待办',
        path: '/backlog',
        element: <Backlog />,
      },
      {
        id: '客户',
        path: '/customer',
        element: <Customer />,
      },
      {
        id: '销售动态',
        path: '/sales',
        element: <Sales />,
      },
      {
        id: '发送短信',
        path: '/marketing',
        element: <Marketing />,
      },
      {
        id: '统计',
        path: '/statistics',
        element: <Statistics />,
      },
      {
        id: '寄存列表',
        path: '/other',
        element: <Other />,
      },
    ],
  },
];

export default routes;
