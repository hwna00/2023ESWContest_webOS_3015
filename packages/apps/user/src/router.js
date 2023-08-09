import { createBrowserRouter } from 'react-router-dom';
import NotFound from './views/NotFound';
const router = createBrowserRouter([
  {
    path: '/',
    element: <div>root</div>,
    errorElement: <NotFound />,
  },
]);

export default router;
