import { useSelector } from 'react-redux';
import { useQuery } from '@tanstack/react-query';
import {
  Box,
  HStack,
  Heading,
  Text,
  UnorderedList,
  VStack,
} from '@chakra-ui/react';

import { getAppointments } from '../../api';

function CustomHeader() {
  return (
    <HStack width="full" fontSize="lg" fontWeight="bold">
      <Text flex={1} textAlign="center" py="4">
        이름
      </Text>
      <Text flex={1} textAlign="center" py="4">
        전화번호
      </Text>
      <Text flex={1} textAlign="center" py="4">
        예약일자
      </Text>
      <Text flex={1} textAlign="center" py="4">
        예약시간
      </Text>
      <Text flex={1} textAlign="center" py="4">
        타입
      </Text>
    </HStack>
  );
}

function CustomListItem() {
  const appointment = {
    patientName: '하철환',
    phoneNumber: '12',
    date: '12',
    time: '12',
    isNFTF: '0',
  };
  return (
    <HStack as="li" width="full" py="4" bgColor="primary.100" borderRadius="md">
      <Text textAlign="center" flex={1}>
        {appointment.patientName}
      </Text>
      <Text textAlign="center" flex={1}>
        {appointment.phoneNumber}
      </Text>
      <Text textAlign="center" flex={1}>
        {appointment.date}
      </Text>
      <Text textAlign="center" flex={1}>
        {appointment.time}
      </Text>
      <Text textAlign="center" flex={1}>
        {appointment.isNFTF === '0' ? '대면' : '비대면'}
      </Text>
    </HStack>
  );
}

const Appointments = function () {
  // TODO: doctor_id를 id로 변경해야 함
  const doctorId = useSelector(state => state.doctor.doctor_id);
  const { data: appointments = [] } = useQuery(
    ['appointments'],
    getAppointments(doctorId),
  );
  return (
    <Box height="full" overflow="hidden">
      <Heading as="h1">예약된 진료</Heading>
      <VStack marginTop="8" width="full">
        <CustomHeader />
        <UnorderedList
          width="full"
          listStyleType="none"
          margin="0"
          spacing="4"
          height="sm"
          overflowY="scroll"
        >
          {appointments.map(appointment => (
            <CustomListItem key={appointment.id} appointment={appointment} />
          ))}
        </UnorderedList>
      </VStack>
    </Box>
  );
};

export default Appointments;
