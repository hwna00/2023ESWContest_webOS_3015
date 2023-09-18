import { Outlet } from 'react-router-dom';

import NotFound from '../views/NotFound/NotFound';
import SignUp from '../views/Auth/SignUp/SignUp';
import LogIn from '../views/Auth/LogIn/LogIn';
import OnCapture from '../components/SignUpForm/OnCapture';
import BeforeCapture from '../components/SignUpForm/BeforeCapture';
import AfterCapture from '../components/SignUpForm/AfterCapture';
import Step1 from '../views/Auth/SignUp/Step1';
import Step2 from '../views/Auth/SignUp/Step2';
import Step3 from '../views/Auth/SignUp/Step3';

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
          element: <Step1 />,
        },
        {
          path: 'step1',
          element: <Step1 />,
        },
        {
          path: 'step2',
          element: <Step2 />,
        },
        {
          path: 'step3',
          element: <Step3 />,
        },
        {
          path: 'step4',
          children: [
            {
              path: '',
              element: <BeforeCapture />,
            },
            {
              path: 'before-capture',
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
      ],
    },
    {
      path: 'log-in',
      element: <LogIn />,
    },
  ],
};

export default authRoutes;
