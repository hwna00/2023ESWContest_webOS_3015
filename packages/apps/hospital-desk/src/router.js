import React from 'react';

import { createBrowserRouter } from 'react-router-dom';

import ViewAppointment from './views/ViewAppointment/ViewAppointment';
import ManageAppointment from './views/ManageAppointment/ManageAppointment';
import MainPage from './views/MainPage/MainPage';
import AppointmentDetail from './views/AppointmentDetail/AppointmentDetail';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainPage />,
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
]);

export default router;
