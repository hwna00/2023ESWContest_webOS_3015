import { Outlet } from 'react-router-dom';

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
