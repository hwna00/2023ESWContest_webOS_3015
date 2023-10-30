import React from 'react';

import { createBrowserRouter } from 'react-router-dom';

import ErrorPage from './views/ErrorPage';
import NotFound from './views/NotFound';
import LogIn from './views/LogIn';
import SignUp from './views/SignUp';
import Root from './components/Root';
import Setting from './views/Setting';
import EmergencyDetail from './views/EmergencyDetail';
import ManageEmergencies from './views/ManageEmergencies';
import CompletedEmergencies from './views/CompletedEmergencies';
import MyPage from './views/MyPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <NotFound />,
    children: [
      {
        path: '/view-emergencies/emergency-detail/:id',
        element: <EmergencyDetail />,
        children: [],
      },
      {
        path: '/manage-emergencies',
        element: <ManageEmergencies />,
        children: [],
      },
      {
        path: '/completed-emergencies',
        element: <CompletedEmergencies />,
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
      { path: '/mypage', element: <MyPage />, children: [] },
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
