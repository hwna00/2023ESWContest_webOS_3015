import { useCallback } from 'react';

import { useSelector } from 'react-redux';
import ListSkeletion from '@housepital/common/ListSkeleton';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Flex, Box, HStack, Text, UnorderedList } from '@chakra-ui/react';

import WaitingItem from '../../../components/WaitingItem/WaitingItem';
import BackButton from '../../../components/BackButton/BackButton';
import { deleteAppointment, getAppointments } from '../../../api';

function WaitingRoom() {
  const uid = useSelector(state => state.me.uid);

  const queryClient = useQueryClient();

  const { isLoading, data, isError } = useQuery({
    queryKey: ['appointments', uid],
    queryFn: () => getAppointments(uid),
    enabled: !!uid,
  });

  const { mutate } = useMutation(
    appointmentId => deleteAppointment(appointmentId),
    {
      onSuccess: () => {
        // TODO: 삭제 성공 알림
        console.log('삭제 성공');
        queryClient.invalidateQueries(uid);
      },
      onError: () => {
        // TODO: 삭제 실패 알림
        console.log('삭제 실패');
      },
    },
  );

  const cancelAppointment = useCallback(
    async appointmentId => {
      mutate(appointmentId);
    },
    [mutate],
  );

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
