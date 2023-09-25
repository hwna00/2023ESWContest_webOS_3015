import { Outlet, useNavigate } from 'react-router-dom';
import LoadingPage from "@housepital/common/LoadingPage";

import useUser from '../../hooks/useUser';

const AuthRoot = function () {
  // const navigate = useNavigate();
  // const { userLoading, user, isLoggedIn } = useUser();
  // console.log(userLoading, user, isLoggedIn);

  return (
    // <>{userLoading ? <LoadingPage /> : user ? navigate('/') : <Outlet />}</>
    <Outlet />
  );
};

export default AuthRoot;
