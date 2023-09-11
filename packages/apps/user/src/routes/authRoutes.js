import { Outlet } from 'react-router-dom';

import NotFound from '../views/NotFound/NotFound';
import SignUp from '../views/Auth/SignUp/SignUp';
import LogIn from '../views/Auth/LogIn/LogIn';
import OnCapture from '../components/SignUpForm/OnCapture';
import BeforeCapture from '../components/SignUpForm/BeforeCapture';
import AfterCapture from '../components/SignUpForm/AfterCapture';

const authRoutes = {
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
};

export default authRoutes;
