import React from 'react';

import { createBrowserRouter } from 'react-router-dom';

import ViewAppointment from './views/ViewAppointment';
import ManageAppointment from './views/ManageAppointment';
import MainPage from './views/MainPage';
import AppointmentDetail from './views/AppointmentDetail';
import ErrorPage from './ErrorPage';
import NotFound from './views/NotFound';
import Root from './component/Root';
import SignUp from './views/SignUp';
import LogIn from './views/LogIn';
import CompletedDiagnosis from './views/CompletedDiagnosis';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <NotFound />,
    children: [
      { path: '', element: <MainPage /> },
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
      {
        path: '/completed-diagnosis',
        element: <CompletedDiagnosis />,
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
