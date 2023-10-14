import React from 'react';

import { createBrowserRouter } from 'react-router-dom';

import MainPage from './views/MainPage';
import ErrorPage from './views/ErrorPage';
import NotFound from './views/NotFound';
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
]);

export default router;
