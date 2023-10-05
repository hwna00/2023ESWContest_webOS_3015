import { Outlet, createHashRouter } from 'react-router-dom';
import SignUp from './views/SignUp/SignUp';

const router = createHashRouter([
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
]);

export default router;
