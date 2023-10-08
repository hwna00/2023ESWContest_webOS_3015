import { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import SideBar from './SideBar';
import { Box } from '@chakra-ui/react';
import { onAuthStateChanged } from 'firebase/auth';
import LoadingPage from '@housepital/common/LoadingPage';
import { useDispatch, useSelector } from 'react-redux';
import { resetHospital, setHospital } from '../store';
import { getHospital } from '../api';
import { auth } from '../firebase';

function Root() {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const hospital = useSelector(state => state.hospital);

  useEffect(() => {
    onAuthStateChanged(auth, user => {
      setIsLoading(false);
      if (user) {
        setIsLoggedIn(true);
        if (hospital.uid === '') {
          getHospital(user.uid).then(res => {
            dispatch(setHospital(res.data));
          });
        }
      } else {
        setIsLoggedIn(false);
        dispatch(resetHospital());
        navigate('/auth/log-in');
      }
    });
  }, [navigate, dispatch, hospital]);
  return (
    <>
      {!isLoading && isLoggedIn ? (
        <>
          <SideBar />
          <Box ml="60" p="6" height="100vh">
            <Outlet />
          </Box>
        </>
      ) : (
        <LoadingPage />
      )}
    </>
  );
}

export default Root;
