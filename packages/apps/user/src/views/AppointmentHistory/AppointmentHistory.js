import { Box, Divider, HStack, Skeleton, VStack } from '@chakra-ui/react';

import AppointmentHistoryItem from '../../components/AppointmentHistoryItem/AppointmentHistoryItem';
import { useQuery } from '@tanstack/react-query';
import { getAppointments } from '../../api';
import { useSelector } from 'react-redux';

//TODO: 히스토리 가져오기 요청
const AppointmentHistory = function () {
  const uid = useSelector(state => state.me.uid);
  const { isLoading, data: histories } = useQuery(
    ['appointment'],
    getAppointments(uid),
  );

  return (
    <VStack mx="5" align="stretch">
      <HStack mt="7" mb="-2" justifyContent="space-evenly">
        <Box width="48" textAlign="center" fontWeight="bold">
          진료 일시
        </Box>
        <Box width="48" textAlign="center" fontWeight="bold">
          진료 병원
        </Box>
        <Box width="48" textAlign="center" fontWeight="bold">
          제조 약국
        </Box>
        <Box width="20" />
      </HStack>
      <Divider h="0.5" mb="1" bgColor="black" />
      <Box
        display="flex"
        flexDirection="column"
        gap="3"
        h="470"
        overflowY="scroll"
      >
        {histories
          ?.sort((a, b) => {
            if (a.prescriptionDate > b.prescriptionDate) return 1;
            if (a.prescriptionDate === b.prescriptionDate) return 0;
            if (a.prescriptionDate < b.prescriptionDate) return -1;
          })
          .map((history, index) => (
            <Skeleton isLoaded={!isLoading}>
              <AppointmentHistoryItem key={index} history={history} />
            </Skeleton>
          ))}
      </Box>
    </VStack>
  );
};

export default AppointmentHistory;
