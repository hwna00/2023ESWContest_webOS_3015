import { Outlet, useNavigate } from 'react-router-dom';
import { Box, Text } from '@chakra-ui/react';

import StatusBar from '../StatusBar/StatusBar';
import SideBar from '../SideBar/SideBar';

const Root = function () {
  const navigate = useNavigate();
  const userLoading = false;
  const user = {
    username: '하철환',
  };

  return (
    <>
      {userLoading ? (
        <Text>Loading..</Text>
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
