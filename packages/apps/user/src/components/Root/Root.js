import { Navigate, Outlet } from 'react-router-dom';
import { Box } from '@chakra-ui/react';

import StatusBar from '../StatusBar/StatusBar';
import SideBar from '../SideBar/SideBar';
import { auth } from '../../../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { useState } from 'react';

const Root = function () {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  onAuthStateChanged(auth, user => {
    setIsLoading(false);
    if (user) {
      setIsLoggedIn(true);
      //TODO: DB에서 정보 요청 및 store에 저장
    } else {
      //TODO: store 정보 삭제
      setIsLoading(false);
    }
  });

  return (
    <>
      {isLoading ? (
        'loading...'
      ) : isLoggedIn ? (
        <>
          <SideBar />
          <StatusBar />
          <Box ml="40" p="6" pt="14" height="100vh">
            <Outlet />
          </Box>
        </>
      ) : (
        <Navigate to={'/auth/log-in'} />
      )}
    </>
  );
};

export default Root;
