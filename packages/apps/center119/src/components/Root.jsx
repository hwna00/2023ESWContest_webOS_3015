import { Outlet, useNavigate } from 'react-router-dom';
import SideBar from './SideBar';
import { Box, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';
import { resetCounselor, setCounselor } from '../store';
import { useDispatch, useSelector } from 'react-redux';
import { getCounselor } from '../api';

function Root() {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const counselorId = useSelector(state => state.counselor.counselorId);

  useEffect(() => {
    onAuthStateChanged(auth, async user => {
      if (!user) {
        dispatch(resetCounselor());
        navigate('/auth/log-in');
      }
      if (!counselorId) {
        try {
          const doctor = await getCounselor(user.uid);
          dispatch(setCounselor(doctor));
        } catch {
          navigate('/auth/log-in');
        }
      }
      setIsLoading(false);
    });
  }, [navigate, dispatch, counselorId]);
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
        <Text>로딩중</Text>
      )}
    </>
  );
}

export default Root;
