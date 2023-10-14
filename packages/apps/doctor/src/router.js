import { Outlet, createHashRouter } from 'react-router-dom';

import SignUp from './views/SignUp';
import SettingPage from './views/SettingPage';
import MyPage from './views/MyPage';
import MainPage from './views/MainPage';
import LogIn from './views/LogIn';
import AppointmentsHistory from './views/AppointmentsHistory';
import Appointments from './views/Appointments';
import AppointmentDetail from './views/AppointmentDetail';
import Root from './layout/Root';

const router = createHashRouter([
  {
    path: '',
    element: <Root />,
    children: [
      {
        path: '',
        element: <MainPage />,
      },
      {
        path: '/appointments',
        element: <Appointments />,
      },
      {
        path: '/appointments/:id',
        element: <AppointmentDetail />,
      },
      {
        path: '/appointments-history',
        element: <AppointmentsHistory />,
      },
      {
        path: '/mypage',
        element: <MyPage />,
      },
      {
        path: '/settings',
        element: <SettingPage />,
      },
    ],
  },
  {
    path: 'auth',
    element: <Outlet />,
    children: [
      {
        path: 'sign-up',
        element: <SignUp />,
      },
      {
        path: 'log-in',
        element: <LogIn />,
      },
    ],
  },
]);

export default router;
