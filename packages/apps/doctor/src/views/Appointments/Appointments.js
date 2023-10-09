import { Link as ReactRouterLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useQuery } from '@tanstack/react-query';
import {
  Box,
  HStack,
  Heading,
  Text,
  UnorderedList,
  VStack,
  Link as ChakraLink,
  ListItem,
  Skeleton,
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

function CustomListItem({ appointment }) {
  return (
    <ListItem cursor="pointer">
      <ChakraLink
        as={ReactRouterLink}
        to={`/appointments/${appointment.id}`}
        textDecoration="none !important"
      >
        <HStack
          as="li"
          width="full"
          py="4"
          bgColor="primary.100"
          borderRadius="md"
        >
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
      </ChakraLink>
    </ListItem>
  );
}

const Appointments = function () {
  // TODO: doctor_id를 id로 변경해야 함
  const doctorId = useSelector(state => state.doctor.doctor_id);
  const {
    isLoading,
    data: appointments = [],
    isError,
  } = useQuery(['appointments'], getAppointments(doctorId));
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
          {isLoading ? (
            <>
              <Skeleton height="16" borderRadius="md" />
              <Skeleton height="16" borderRadius="md" />
              <Skeleton height="16" borderRadius="md" />
              <Skeleton height="16" borderRadius="md" />
            </>
          ) : (
            <>
              {appointments.map(appointment => (
                <CustomListItem
                  key={appointment.id}
                  appointment={appointment}
                />
              ))}
              {isError && (
                <Text textAlign="center">예약을 불러올 수 없습니다.</Text>
              )}
            </>
          )}
        </UnorderedList>
      </VStack>
    </Box>
  );
};

export default Appointments;
