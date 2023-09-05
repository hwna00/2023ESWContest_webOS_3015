import { Link, Outlet, createBrowserRouter } from 'react-router-dom';
import NotFound from './views/NotFound';
import Root from './components/Root/Root';
import AppointmentHistory from './views/AppointmentHistory/AppointmentHistory';
import AppointmentHistoryDetail from './views/AppointmentHistory/AppointmentHistoryDetail/AppointmentHistoryDetail';
import MyPage from './views/MyPage/MyPage';
import MainPage from './views/MainPage/MainPage';
import SignUp from './views/Auth/SignUp/SignUp';
import LogIn from './views/Auth/LogIn/LogIn';
import Appointment from './views/Appointment/Appointment';
import AppointDoctor from './views/Appointment/Doctor/AppointDoctor';
import AppointHospital from './views/Appointment/Hospital/AppointHospital';

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
          path: 'appointment',
          element: <Appointment />,
          children: [
            {
              path: 'doctors',
              element: <AppointDoctor />,
            },
            {
              path: 'hospitals',
              element: <AppointHospital />,
            },
          ],
        },
        {
          path: 'appointment-history',
          element: <AppointmentHistory />,
        },
        {
          path: 'appointment-history/:id',
          element: <AppointmentHistoryDetail />,
        },
        {
          path: 'health',
          element: '',
        },
        {
          path: 'medicines',
          element: '',
        },
        {
          path: 'settings',
          element: '',
        },
      ],
    },
    {
      path: 'auth',
      element: <Outlet />,
      errorElement: <NotFound />,
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
  ],
  {
    basename: '/',
  },
);

export default router;
