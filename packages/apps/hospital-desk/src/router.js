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
import Setting from './views/Setting';
import MyPage from './views/MyPage';

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
        path: '/completed-diagnosis',
        element: <CompletedDiagnosis />,
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
        path: '/settings',
        element: <Setting />,
        children: [],
      },
      {
        path: '/mypage',
        element: <MyPage />,
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
      {
        path: 'mypage',
        element: <MyPage />,
      },
    ],
  },
]);

export default router;
