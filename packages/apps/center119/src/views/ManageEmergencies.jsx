import { useNavigate } from 'react-router-dom';
import styles from '@housepital/common/css/HideScrollBar.module.css';
import { Box, Heading, VStack, Text } from '@chakra-ui/react';

import TableHeader from '../components/TableSection/TableHeader';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getEmergencies } from '../api';
import TableRow from '../components/TableSection/TableRow';
import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import LoadingPage from '@housepital/common/LoadingPage';
import { io } from 'socket.io-client';
import { createEmergencyRequest } from '../api';

const ManageEmergencies = function () {
  const socketRef = useRef();

  const counselor = useSelector(state => state.counselor);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data, isLoading, error } = useQuery(
    ['emergencies'],
    () => getEmergencies(counselor.counselorId),
    { enabled: !!counselor.counselorId },
  );
  const { mutate } = useMutation(
    uid => createEmergencyRequest(counselor.counselorId, uid),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('emergencies');
      },
      onError: () => {
        console.log('연결에 실패했습니다.');
      },
    },
  );

  useEffect(() => {
    if (error) {
      navigate('/error-page');
    }
  }, [data, error, navigate]);

  useEffect(() => {
    socketRef.current = io(process.env.REACT_APP_BACKEND_API);

    socketRef.current.on('emergency_call', uid => {
      mutate(uid);
    });

    socketRef.current.emit('join_room', counselor.counselorId);
  }, [counselor, mutate]);

  return (
    <>
      {isLoading ? (
        <LoadingPage />
      ) : (
        <VStack spacing="8" p="8" alignItems="initial">
          <Heading textAlign="left" fontSize="30px">
            {counselor.centerName}
          </Heading>

          <Box>
            <Heading fontSize="25px">들어온 요청</Heading>
            <TableHeader
              tableHeaders={['이름', '전화번호', '생년월일', '상세보기']}
            />
            {data && data.length > 0 ? (
              <div className={styles.hideScrollBar}>
                <Box maxH="250px" overflowY="scroll">
                  {data.map(request => (
                    <TableRow
                      key={request.id}
                      data={request}
                      buttonType="detail"
                    />
                  ))}
                </Box>
              </div>
            ) : (
              <Text>정보가 없습니다.</Text>
            )}
          </Box>
        </VStack>
      )}
    </>
  );
};

export default ManageEmergencies;
