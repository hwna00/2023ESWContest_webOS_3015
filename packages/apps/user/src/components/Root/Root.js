import { useEffect, useState } from 'react';

import { Outlet, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { onAuthStateChanged, getAuth } from 'firebase/auth';
import { Box } from '@chakra-ui/react';

import StatusBar from '../StatusBar/StatusBar';
import SideBar from '../SideBar/SideBar';
import { setUser } from '../../store';

const Root = function () {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const auth = getAuth();

    onAuthStateChanged(auth, user => {
      if (user) {
        dispatch(setUser(user));
      } else {
        navigate('/auth/log-in');
      }
    });
  }, [navigate]);

  return (
    <>
      <SideBar />
      <StatusBar />
      <Box ml="40" p="6" pt="14" height="100vh">
        <Outlet />
      </Box>
    </>
  );
};

export default Root;
