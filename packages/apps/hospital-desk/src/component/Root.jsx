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
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const hospitalId = useSelector(state => state.hospital.id);

  useEffect(() => {
    onAuthStateChanged(auth, async user => {
      if (!user) {
        dispatch(resetHospital());
        navigate('/auth/log-in');
      }
      if (!hospitalId) {
        try {
          const doctor = await getHospital(user.uid);
          dispatch(setHospital(doctor));
        } catch {
          navigate('/auth/log-in');
        }
      }
      setIsLoading(false);
    });
  }, [navigate, dispatch, hospitalId]);
  return (
    <>
      {!isLoading ? (
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
