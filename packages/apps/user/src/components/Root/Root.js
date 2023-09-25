import { Navigate, Outlet } from 'react-router-dom';
import { Box } from '@chakra-ui/react';

import StatusBar from '../StatusBar/StatusBar';
import SideBar from '../SideBar/SideBar';
import { auth } from '../../../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMe } from '../../api';
import { resetMe } from '../../store';

const Root = function () {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const me = useSelector(state => state.me);
  const dispatch = useDispatch();

  onAuthStateChanged(auth, user => {
    setIsLoading(false);
    if (user) {
      setIsLoggedIn(true);
      if (!me) {
        getMe(user.email);
      }
    } else {
      dispatch(resetMe());
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
