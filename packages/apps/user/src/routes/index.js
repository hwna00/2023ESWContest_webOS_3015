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

const router = createHashRouter(
  [
    {
      path: '/',
      element: <Root />,
      errorElement: <NotFound />,
      children: [
        {
          path: '',
          element: <VideoCall />,
        },
        {
          path: 'temp',
          element: <MainPage />,
        },
        {
          path: 'mypage',
          element: <MyPage />,
        },
        {
          path: 'medicines',
          element: '',
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
