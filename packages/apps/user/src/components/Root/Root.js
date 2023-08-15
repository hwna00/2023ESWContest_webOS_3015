import { Outlet } from 'react-router-dom';
import { Box } from '@chakra-ui/react';
import SideBar from '../SideBar/SideBar';

//TODO: 로그인 기능 구현 후 실제 user를 props 로 받아와야 한다.
const user = {
  name: '하철환',
  img: 'https://www.marthastewart.com/thmb/g-FunKfdiZombJQ7pB4wb8BF4C8=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/cat-kitten-138468381-4cd82b91d7be45cb9f9aa8366e10bce4.jpg',
};

const Root = function () {
  return (
    <>
      <SideBar user={user} />
      <Box ml="40" p="6" height={'100vh'}>
        <Outlet />
      </Box>
    </>
  );
};

export default Root;
