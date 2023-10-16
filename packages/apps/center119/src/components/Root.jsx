import { Outlet } from 'react-router-dom';
import SideBar from './SideBar';
import { Box } from '@chakra-ui/react';

function Root() {
  return (
    <>
      <SideBar />
      <Box ml="60" p="6" height="100vh">
        <Outlet />
      </Box>
    </>
  );
}

export default Root;
