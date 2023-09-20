import { createBrowserRouter } from 'react-router-dom';

import SignUp from './views/SignUp';

const router = createBrowserRouter([
  {
    path: '/',
    element: <SignUp />,
    children: [],
  },
]);

export default router;
