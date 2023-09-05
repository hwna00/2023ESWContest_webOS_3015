import { Outlet, createBrowserRouter } from 'react-router-dom';
import NotFound from './views/NotFound';
import Root from './components/Root/Root';
import MyPage from './views/MyPage/MyPage';
import MainPage from './views/MainPage/MainPage';
import SignUp from './views/Auth/SignUp/SignUp';
import LogIn from './views/Auth/LogIn/LogIn';
import BeforeCapture from './components/SignUpForm/BeforeCapture';
import OnCapture from './components/SignUpForm/OnCapture';
import AfterCapture from './components/SignUpForm/AfterCapture';

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
          path: 'doctor-appointment',
          element: '',
        },
        {
          path: 'appointment-history',
          element: '',
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
