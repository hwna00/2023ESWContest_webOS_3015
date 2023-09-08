import { Link, Outlet, createBrowserRouter } from 'react-router-dom';
import NotFound from './views/NotFound';
import Root from './components/Root/Root';
import AppointmentHistory from './views/AppointmentHistory/AppointmentHistory';
import AppointmentHistoryDetail from './views/AppointmentHistory/AppointmentHistoryDetail/AppointmentHistoryDetail';
import HealthHistory from './views/HealthHistory/HealthHistory';
import MyPage from './views/MyPage/MyPage';
import MainPage from './views/MainPage/MainPage';
import SignUp from './views/Auth/SignUp/SignUp';
import LogIn from './views/Auth/LogIn/LogIn';
import Appointment from './views/Appointment/Appointment';
import AppointDoctor from './views/Appointment/Doctor/AppointDoctor';
import AppointHospital from './views/Appointment/Hospital/AppointHospital';
import BeforeCapture from './components/SignUpForm/BeforeCapture';
import OnCapture from './components/SignUpForm/OnCapture';
import AfterCapture from './components/SignUpForm/AfterCapture';
import AppointmentList from './views/Appointment/AppointmentList';

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
        },
        {
          path: 'appointment/doctors',
          element: <AppointDoctor />,
        },
        {
          path: 'appointment/hospitals',
          element: <AppointHospital />,
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
          path: 'health-history',
          element: <HealthHistory />,
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
          children: [
            {
              path: '',
              element: <BeforeCapture />,
            },
            {
              path: 'on-capture',
              element: <OnCapture />,
            },
            {
              path: 'after-capture',
              element: <AfterCapture />,
            },
          ],
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
