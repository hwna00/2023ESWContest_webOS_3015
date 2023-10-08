import { useEffect, useState } from 'react';

import { Outlet, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { onAuthStateChanged } from 'firebase/auth';
import LoadingPage from '@housepital/common/LoadingPage';
import { Box } from '@chakra-ui/react';

import { setDoctor } from '../store';
import { getDoctor } from '../api';
import { auth } from '../../firebase';

const Root = function () {
  const [isLoading, setIsLoadding] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const doctor = useSelector(state => state.doctor);

  useEffect(() => {
    onAuthStateChanged(auth, async user => {
      if (!user) {
        navigate('/#/auth/log-in');
      }
      // TODO: doctor_id를 id로 변경해야 함
      if (!doctor.doctor_id) {
        const doctor = await getDoctor(user.uid);
        dispatch(setDoctor(doctor));
      }
      setIsLoadding(false);
    });
  }, []);
  return (
    <Box width="100vw" height="100vh" padding="4">
      {isLoading ? <LoadingPage /> : <Outlet />}
    </Box>
  );
};

export default Root;
