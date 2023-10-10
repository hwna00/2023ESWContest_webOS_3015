import { useCallback, useEffect, useState } from 'react';

import { Flex, Box, HStack, Text, UnorderedList } from '@chakra-ui/react';

import WaitingItem from '../../../components/WaitingItem/WaitingItem';
import BackButton from '../../../components/BackButton/BackButton';
import { getAppointments } from '../../../api';
import { useSelector } from 'react-redux';
import ListSkeletion from '@housepital/common/ListSkeleton';

function WaitingRoom() {
  const uid = useSelector(state => state.me.uid);
  const [appointments, setAppointments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const fetchAppointments = useCallback(async () => {
    if (!uid) {
      setAppointments([]);
      setIsLoading(true);
      return;
    }
    try {
      const response = await getAppointments(uid);
      setAppointments(response);
      setIsError(false);
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }, [uid]);

  useEffect(() => {
    fetchAppointments();
  }, [fetchAppointments]);

  const cancelAppointment = useCallback(appointmentId => {
    // TODO: appointment id 기반으로 예약 취소하기
    console.log(appointmentId);
  }, []);

  return (
    <Box>
      <Flex>
        <BackButton title="대기실" />
      </Flex>

      <HStack
        width="full"
        justifyContent="space-evenly"
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
          의사
        </Box>
        <Box flex={1} />
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
            {appointments?.map(appointment => (
              <WaitingItem
                key={appointment.id}
                appointment={appointment}
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
