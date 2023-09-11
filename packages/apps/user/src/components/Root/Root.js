import { useEffect, useState } from 'react';

import { Outlet, useNavigate } from 'react-router-dom';
import { onAuthStateChanged, getAuth } from 'firebase/auth';
import { Box } from '@chakra-ui/react';

import StatusBar from '../StatusBar/StatusBar';
import SideBar from '../SideBar/SideBar';

const Root = function () {
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const auth = getAuth();

    onAuthStateChanged(auth, user => {
      if (user) {
        setCurrentUser(user);
      } else {
        setCurrentUser(null);
        navigate('/auth/log-in');
      }
    });
  }, [navigate]);

  return (
    <>
      <SideBar user={currentUser} />
      <StatusBar />
      <Box ml="40" p="6" pt="14" height="100vh">
        <Outlet />
      </Box>
    </>
  );
};

export default Root;
