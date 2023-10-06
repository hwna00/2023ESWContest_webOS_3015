import NotFound from '../views/NotFound/NotFound';
import Step3 from '../views/Auth/SignUp/Step3';
import Step2 from '../views/Auth/SignUp/Step2';
import Step1 from '../views/Auth/SignUp/Step1';
import SignUp from '../views/Auth/SignUp/SignUp';
import LogIn from '../views/Auth/LogIn/LogIn';
import AuthCallback from '../views/Auth/AuthCallback/AuthCallback';
import OnCapture from '../components/SignUpForm/OnCapture';
import BeforeCapture from '../components/SignUpForm/BeforeCapture';
import AfterCapture from '../components/SignUpForm/AfterCapture';
import AuthRoot from '../components/Root/AuthRoot';

const authRoutes = {
  path: 'auth',
  element: <AuthRoot />,
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
    {
      path: 'callback',
      element: <AuthCallback />,
    },
  ],
};

export default authRoutes;
