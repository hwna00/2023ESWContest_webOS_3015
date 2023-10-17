import HealthManage from '../views/HealthManage';
import HealthManageDetail from '../views/HealthManageDetail/HealthManageDetail';

const healthManageRoutes = [
  {
    path: 'health-manage',
    element: <HealthManage />,
  },
  {
    path: 'health-manage/:type',
    element: <HealthManageDetail />,
  },
];

export default healthManageRoutes;
