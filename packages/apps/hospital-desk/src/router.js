import React from 'react';

import { createBrowserRouter } from 'react-router-dom';

import MainPage from './views/MainPage/MainPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainPage />,
    children: [],
  },
]);

export default router;
