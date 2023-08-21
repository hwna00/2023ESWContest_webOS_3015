import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Box, HStack, Text } from '@chakra-ui/react';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import SideBar from '../SideBar/SideBar';
import { auth } from '../../../firebase';

const Root = function () {
  const user = {
    name: auth.currentUser?.displayName,
    profileImg: auth.currentUser?.photoURL,
  };

  dayjs.locale('ko');

  const [currentTime, setCurrentTime] = useState(
    dayjs().format('MM월 DD일 (ddd) 오후 HH:mm'),
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(dayjs().format('MM월 DD일 (ddd) 오후 HH:mm'));
      console.log('mounted');
    }, 1000);

    return () => {
      clearInterval(timer);
      console.log('unmounted');
    };
  }, []);

  return (
    <>
      {auth.currentUser ? <SideBar user={user} /> : <SideBar />}
      <HStack
        justifyContent={'flex-end'}
        alignItems={'center'}
        bg={'primary.200'}
        w={'full'}
        height={'8'}
        px={'4'}
        fontWeight={'bold'}
      >
        <Text>{currentTime}</Text>
      </HStack>
      <Box ml="40" p="6" height={'100vh'}>
        <Outlet />
      </Box>
    </>
  );
};

export default Root;
