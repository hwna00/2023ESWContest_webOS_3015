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
import LS2Request from '@enact/webos/LS2Request';

const bridge = new LS2Request();

const Root = function () {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigate = useNavigate();
  const me = useSelector(state => state.me);
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, async user => {
      setIsLoading(false);
      if (user) {
        setIsLoggedIn(true);
        if (me.uid === '') {
          const response = await getMe(user.uid);
          dispatch(setMe(response.result));
        }
      } else {
        setIsLoggedIn(false);
        dispatch(resetMe());
        navigate('/auth/log-in');
      }
    });
  }, [dispatch, me, navigate]);

  useEffect(() => {
    const params = { appointment: { date: '2023-10-29', time: '01:10:00' } };
    const lsRequest = {
      service: 'com.housepital.app.user.service',
      method: 'appointmentToast',
      parameters: params,
      onSuccess: payload => console.log('success', payload),
      onFailure: payload => console.log('fail', payload),
    };
    bridge.send(lsRequest);
  }, []);

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
