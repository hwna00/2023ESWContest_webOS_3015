import React from 'react';

import { createBrowserRouter } from 'react-router-dom';

import MainPage from './views/MainPage';
import ErrorPage from './views/ErrorPage';
import NotFound from './views/NotFound';
import LogIn from './views/LogIn';
import SignUp from './views/SignUp';
import Root from './components/Root';
import Setting from './views/Setting';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <NotFound />,
    children: [
      { path: '', element: <MainPage /> },
      {
        path: '/error-page',
        element: <ErrorPage />,
        children: [],
      },
      {
        path: '/settings',
        element: <Setting />,
        children: [],
      },
    ],
  },
  {
    path: '/auth',
    errorElement: <NotFound />,
    children: [
      {
        path: 'log-in',
        element: <LogIn />,
      },
      {
        path: 'sign-up',
        element: <SignUp />,
      },
    ],
  },
]);

export default router;
