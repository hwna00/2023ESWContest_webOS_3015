import { createHashRouter } from 'react-router-dom';

import SettingPage from '../views/SettingPage/SettingPage';
import NotFound from '../views/NotFound';
import MyPage from '../views/MyPage/MyPage';
import MainPage from '../views/MainPage/MainPage';
import Root from '../components/Root/Root';

import healthHistoryRoutes from './healthHistoryRoutes';
import authRoutes from './authRoutes';
import appointmentRoutes from './appointmentRoutes';
import VideoCall from '../views/VideoCall/VideoCall';
import MedicinesManage from '../views/MedicinesManage/MedicinesManage';
import SideEffect from '../views/SideEffect';

const router = createHashRouter(
  [
    {
      path: '/',
      element: <Root />,
      errorElement: <NotFound />,
      children: [
        {
          path: '',
          element: <MainPage />,
        },
        {
          path: 'treatment/:appointmentId',
          element: <VideoCall />,
        },
        {
          path: 'mypage',
          element: <MyPage />,
        },
        {
          path: 'medicines',
          element: <MedicinesManage />,
        },
        {
          path: 'medicines/side-effects',
          element: <SideEffect />,
        },
        {
          path: 'settings',
          element: <SettingPage />,
        },
        ...appointmentRoutes,
        ...healthHistoryRoutes,
      ],
    },
    {
      ...authRoutes,
    },
  ],
  {
    basename: '/',
  },
);

export default router;
