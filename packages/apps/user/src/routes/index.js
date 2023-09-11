import { createBrowserRouter } from 'react-router-dom';

import NotFound from '../views/NotFound';
import MyPage from '../views/MyPage/MyPage';
import MainPage from '../views/MainPage/MainPage';
import Root from '../components/Root/Root';

import healthHistoryRoutes from './healthHistoryRoutes';
import authRoutes from './authRoutes';
import appointmentRoutes from './appointmentRoutes';

const router = createBrowserRouter(
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
          path: 'mypage',
          element: <MyPage />,
        },
        {
          path: 'medicines',
          element: '',
        },
        {
          path: 'settings',
          element: '',
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
