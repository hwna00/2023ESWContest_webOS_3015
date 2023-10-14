import React from 'react';

import { createBrowserRouter } from 'react-router-dom';

import MainPage from './views/MainPage';
import ErrorPage from './views/ErrorPage';
import NotFound from './views/NotFound';
import LogIn from './views/LogIn';
import SignUp from './views/SignUp';

const router = createBrowserRouter([
  {
    path: '/',
    errorElement: <NotFound />,
    children: [
      { path: '', element: <MainPage /> },
      {
        path: '/error-page',
        element: <ErrorPage />,
        children: [],
      },
    ],
  },
  {
    path: '/auth',
    errorElement: <NotFound />,
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
