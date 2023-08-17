import { Outlet, createBrowserRouter } from 'react-router-dom';
import NotFound from './views/NotFound';
import Root from './components/Root/Root';
import MyPage from './views/MyPage/MyPage';
import MainPage from './views/MainPage/MainPage';
import SignUp from './views/Auth/SignUp/SignUp';

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <Root />,
      errorElement: <NotFound />,
      children: [
        {
          path: '',
          element: '',
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
      children: [
        {
          path: 'sign-up',
          element: <SignUp />,
        },
      ],
    },
  ],
  {
    basename: '/',
  },
);

export default router;
