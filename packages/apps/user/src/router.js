import { createBrowserRouter } from 'react-router-dom';
import NotFound from './views/NotFound';
import Root from './components/Root/Root';
import MyPage from './views/MyPage/MyPage';
import MainPage from './views/MainPage/MainPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <NotFound />,
    children: [
      {
        path: '',
        element: <MainPage />,
      },
      {
        path: 'mypage',
        element: <MyPage />,
      },
      {
        path: 'doctor-appointment',
        element: '',
      },
      {
        path: 'appointment-history',
        element: '',
      },
      {
        path: 'health',
        element: '',
      },
      {
        path: 'medicines',
        element: '',
      },
      {
        path: 'settings',
        element: '',
      },
    ],
  },
]);

export default router;
