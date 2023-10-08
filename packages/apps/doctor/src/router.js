import { Outlet, createHashRouter } from 'react-router-dom';

import SignUp from './views/SignUp/SignUp';
import MainPage from './views/MainPage/MainPage';
import LogIn from './views/LogIn/LogIn';
import Root from './layout/Root';

const router = createHashRouter([
  {
    path: '',
    element: <Root />,
    children: [
      {
        path: '',
        element: <MainPage />,
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
      {
        path: 'log-in',
        element: <LogIn />,
      },
    ],
  },
]);

export default router;
