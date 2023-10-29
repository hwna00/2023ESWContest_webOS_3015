import { useCallback, useEffect, useRef, useState } from 'react';

import { useSelector } from 'react-redux';
import ListSkeletion from '@housepital/common/ListSkeleton';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Flex, Box, HStack, Text, UnorderedList } from '@chakra-ui/react';
import { io } from 'socket.io-client';

import WaitingItem from '../../../components/WaitingItem/WaitingItem';
import BackButton from '../../../components/BackButton/BackButton';
import { deleteAppointment, getAppointments } from '../../../api';
import useCreateToast from '@housepital/common/hooks/useCreateToast';

const roomName = 'myRoom';

function WaitingRoom() {
  const socketRef = useRef();
  const [currAppointmentId, setCurrAppointmentId] = useState();

  const uid = useSelector(state => state.me.uid);
  const queryClient = useQueryClient();

  const { isLoading, data, isError } = useQuery({
    queryKey: ['appointments', uid],
    queryFn: () => getAppointments(uid),
    enabled: !!uid,
  });
  const toast = useCreateToast();
  const { mutate } = useMutation(
    appointmentId => deleteAppointment(appointmentId),
    {
      onSuccess: () => {
        toast('삭제에 성공했습니다.');
        queryClient.invalidateQueries(uid);
      },
      onError: () => {
        toast('삭제에 실패했습니다.');
      },
    },
  );

  const cancelAppointment = useCallback(
    async appointmentId => {
      mutate(appointmentId);
    },
    [mutate],
  );

  useEffect(() => {
    socketRef.current = io(`${process.env.REACT_APP_BACKEND_API}`);

    socketRef.current.on('trmt_start', async id => {
      console.log('trmt_start: ', id);
      setCurrAppointmentId(id);
    });

    socketRef.current.emit('join_room', roomName);
  }, []);

  return (
    <Box>
      <Flex>
        <BackButton title="대기실" />
      </Flex>

      <HStack
        width="full"
        justifyContent="space-between"
        fontSize="lg"
        fontWeight="bold"
        mt="8"
      >
        <Box flex={1} textAlign="center" fontWeight="bold">
          예약 일시
        </Box>
        <Box flex={1} textAlign="center" fontWeight="bold">
          병원
        </Box>
        <Box flex={1} textAlign="center" fontWeight="bold">
          담당 의사
        </Box>
        <Box flex={2} />
      </HStack>

      <UnorderedList
        listStyleType="none"
        width="full"
        h="80vh"
        overflowY="scroll"
        marginX={0}
        mt="4"
        spacing="4"
      >
        {isLoading ? (
          <ListSkeletion />
        ) : (
          <>
            {isError && (
              <Text textAlign="center">데이터를 불러올 수 없습니다.</Text>
            )}
            {data?.map(appointment => (
              <WaitingItem
                key={appointment.id}
                appointment={{ uid, ...appointment }}
                currAppointmentId={currAppointmentId}
                cancelAppointment={cancelAppointment}
              />
            ))}
          </>
        )}
      </UnorderedList>
    </Box>
  );
}

export default WaitingRoom;
