import { useEffect, useState } from 'react';

import { useNavigate, Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { onAuthStateChanged } from 'firebase/auth';
import LoadingPage from '@housepital/common/LoadingPage';
import { Box } from '@chakra-ui/react';

import StatusBar from '../StatusBar/StatusBar';
import SideBar from '../SideBar/SideBar';
import { resetMe, setMe } from '../../store';
import { getMe } from '../../api';
import { auth } from '../../../firebase';

const Root = function () {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigate = useNavigate();
  const me = useSelector(state => state.me);
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, user => {
      setIsLoading(false);
      if (user) {
        setIsLoggedIn(true);
        if (me.uid === '') {
          getMe(user.uid).then(res => {
            dispatch(setMe(res));
          });
        }
      } else {
        setIsLoggedIn(false);
        dispatch(resetMe());
        navigate('/auth/log-in');
      }
    });
  }, [dispatch, me, navigate]);

  return (
    <>
      {!isLoading && isLoggedIn ? (
        <>
          <SideBar />
          <StatusBar />
          <Box ml="40" p="6" pt="14" height="100vh">
            <Outlet />
          </Box>
        </>
      ) : (
        <LoadingPage />
      )}
    </>
  );
};

export default Root;
