import { Box, HStack, Text, UnorderedList, VStack } from '@chakra-ui/react';

import AppointmentHistoryItem from '../../components/AppointmentHistoryItem';
import { useQuery } from '@tanstack/react-query';
import { getDiagnoses } from '../../api';
import { useSelector } from 'react-redux';

const AppointmentHistory = function () {
  const uid = useSelector(state => state.me.uid);
  const { data: diagnoses } = useQuery(['diagnoses'], () => getDiagnoses(uid), {
    enabled: !!uid,
  });

  return (
    <VStack width="full" height="full" overflowY="hidden">
      <HStack width="full">
        <Box flex={1} textAlign="center" fontWeight="bold">
          진료 일시
        </Box>
        <Box flex={1} textAlign="center" fontWeight="bold">
          진료 병원
        </Box>
        <Box flex={1} textAlign="center" fontWeight="bold">
          비용
        </Box>
        <Box flex={1} />
      </HStack>

      <UnorderedList
        width="full"
        marginX={0}
        mt="4"
        spacing="4"
        height="full"
        overflowY="scroll"
      >
        {diagnoses?.length === 0 && (
          <Text textAlign="center">진료 내역이 없습니다.</Text>
        )}
        {diagnoses?.map(diagnosis => (
          <AppointmentHistoryItem key={diagnosis.id} diagnosis={diagnosis} />
        ))}
      </UnorderedList>
    </VStack>
  );
};

export default AppointmentHistory;
