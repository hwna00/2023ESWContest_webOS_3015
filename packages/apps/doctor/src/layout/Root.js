import { useEffect, useState } from 'react';

import { Outlet, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { onAuthStateChanged } from 'firebase/auth';
import LoadingPage from '@housepital/common/LoadingPage';
import { Box } from '@chakra-ui/react';

import { setDoctor } from '../store';
import SideBar from '../components/SideBar';
import { getDoctor } from '../api';
import { auth } from '../../firebase';

const Root = function () {
  const [isLoading, setIsLoadding] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const doctorId = useSelector(state => state.doctor.id);

  useEffect(() => {
    onAuthStateChanged(auth, async user => {
      if (!user) {
        navigate('/auth/log-in');
      }
      if (!doctorId) {
        try {
          const doctor = await getDoctor(user.uid);
          dispatch(setDoctor(doctor));
        } catch {
          navigate('/auth/log-in');
        }
      }
      setIsLoadding(false);
    });
  }, []);
  return (
    <Box width="100vw" height="100vh">
      {isLoading ? (
        <LoadingPage />
      ) : (
        <>
          <SideBar />
          <Box height="full" ml="40" padding="6">
            <Outlet />
          </Box>
        </>
      )}
    </Box>
  );
};

export default Root;
