import { Outlet } from 'react-router-dom';
import { Box } from '@chakra-ui/react';
import SideBar from '../SideBar/SideBar';
import { auth } from '../../../firebase';

const Root = function () {
  const user = {
    name: auth.currentUser?.displayName,
    profileImg: auth.currentUser?.photoURL,
  };

  return (
    <>
      {auth.currentUser ? <SideBar user={user} /> : <SideBar />}
      <Box ml="40" p="6" height={'100vh'}>
        <Outlet />
      </Box>
    </>
  );
};

export default Root;
