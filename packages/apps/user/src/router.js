import { Link, Outlet, createBrowserRouter } from 'react-router-dom';
import NotFound from './views/NotFound';
import Root from './components/Root/Root';
import AppointmentHistory from './views/AppointmentHistory/AppointmentHistory';
import AppointmentHistoryDetail from './views/AppointmentHistory/AppointmentHistoryDetail/AppointmentHistoryDetail';
import MyPage from './views/MyPage/MyPage';
import MainPage from './views/MainPage/MainPage';
import SignUp from './views/Auth/SignUp/SignUp';
import LogIn from './views/Auth/LogIn/LogIn';
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
          element: (
            <>
              <Link to={'/appointment/doctors'}>doctor</Link>
              <br />
              <Link to={'/appointment/hospitals'}>hospital</Link>
              <Outlet />
            </>
          ),
          children: [
            {
              path: 'doctors',
              element: <AppointmentList />,
            },
            {
              path: 'hospitals',
              element: <AppointmentList />,
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
