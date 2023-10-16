import React from 'react';

import { createBrowserRouter } from 'react-router-dom';

import MainPage from './views/MainPage';
import ErrorPage from './views/ErrorPage';
import NotFound from './views/NotFound';
import LogIn from './views/LogIn';
import SignUp from './views/SignUp';
import Root from './components/Root';
import Setting from './views/Setting';
import RequestDetail from './views/RequestDetail';
import ManageRequests from './views/ManageRequests';
import CompletedRequests from './views/CompletedRequests';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <NotFound />,
    children: [
      { path: '', element: <MainPage /> },
      {
        path: '/view-requests/request-detail/:id',
        element: <RequestDetail />,
        children: [],
      },
      {
        path: '/manage-requests',
        element: <ManageRequests />,
        children: [],
      },
      {
        path: '/completed-requests',
        element: <CompletedRequests />,
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
