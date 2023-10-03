import React from 'react';

import { createBrowserRouter } from 'react-router-dom';

import ManageAppointment from './views/ManageAppointment/ManageAppointment';
import MainPage from './views/MainPage/MainPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainPage />,
    children: [],
  },
  {
    path: '/ManageAppointment',
    element: <ManageAppointment />,
    children: [],
  },
]);

export default router;
