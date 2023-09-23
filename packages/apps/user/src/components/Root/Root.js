import { Outlet, useNavigate } from 'react-router-dom';
import { Box } from '@chakra-ui/react';

import StatusBar from '../StatusBar/StatusBar';
import SideBar from '../SideBar/SideBar';
import useUser from '../../hooks/useUser';

const Root = function () {
  const navigate = useNavigate();
  const { userLoading, user, isLoggedIn } = useUser();
  console.log(userLoading, user, isLoggedIn);

  return (
    <>
      {userLoading ? (
        'loading...'
      ) : user ? (
        <>
          <SideBar />
          <StatusBar />
          <Box ml="40" p="6" pt="14" height="100vh">
            <Outlet />
          </Box>
        </>
      ) : (
        navigate('/auth/log-in')
      )}
    </>
  );
};

export default Root;
