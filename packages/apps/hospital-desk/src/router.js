import React from 'react';

import { createBrowserRouter } from 'react-router-dom';

import ViewAppointment from './views/ViewAppointment';
import ManageAppointment from './views/ManageAppointment';
import MainPage from './views/MainPage';
import AppointmentDetail from './views/AppointmentDetail';
import ErrorPage from './ErrorPage';
import NotFound from './views/NotFound';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainPage />,
    errorElement: <NotFound />,
    children: [],
  },
  {
    path: '/manage-appointment',
    element: <ManageAppointment />,
    children: [],
  },
  {
    path: '/view-appointment',
    element: <ViewAppointment />,
    children: [],
  },
  {
    path: '/view-appointment/appointment-detail/:id',
    element: <AppointmentDetail />,
    children: [],
  },
  {
    path: '/error-page',
    element: <ErrorPage />,
    children: [],
  },
]);

export default router;
