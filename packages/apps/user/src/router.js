import { Outlet, createBrowserRouter } from 'react-router-dom';
import NotFound from './views/NotFound';
import SideBar from './components/SideBar';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <>
        <SideBar />
        <Outlet />
      </>
    ),
    errorElement: <NotFound />,
  },
]);

export default router;
