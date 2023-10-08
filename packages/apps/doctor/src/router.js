import { Outlet, createHashRouter } from 'react-router-dom';
import SignUp from './views/SignUp/SignUp';
import LogIn from './views/LogIn/LogIn';

const router = createHashRouter([
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
