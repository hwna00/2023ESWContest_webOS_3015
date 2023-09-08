import { Outlet } from 'react-router-dom';
import NotFound from '../views/NotFound/NotFound';
import SignUp from '../views/Auth/SignUp/SignUp';
import BeforeCapture from '../components/SignUpForm/BeforeCapture';
import OnCapture from '../components/SignUpForm/OnCapture';
import AfterCapture from '../components/SignUpForm/AfterCapture';
import LogIn from '../views/Auth/LogIn/LogIn';

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
