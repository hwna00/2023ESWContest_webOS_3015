import { Outlet, useNavigate } from 'react-router-dom';

import useUser from '../../hooks/useUser';
import LoadingPage from '../../../../../common/LoadingPage';

const AuthRoot = function () {
  const navigate = useNavigate();
  const { userLoading, user, isLoggedIn } = useUser();
  console.log(userLoading, user, isLoggedIn);

  return (
    <>{userLoading ? <LoadingPage /> : user ? navigate('/') : <Outlet />}</>
  );
};

export default AuthRoot;
