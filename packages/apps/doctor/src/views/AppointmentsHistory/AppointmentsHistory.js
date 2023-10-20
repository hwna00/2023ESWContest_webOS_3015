import { Link as ReactRouterLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useQuery } from '@tanstack/react-query';
// import LoadingPage from '@housepital/common/LoadingPage';
import ListSkeletion from '@housepital/common/ListSkeleton';
import {
  Box,
  HStack,
  Heading,
  ListItem,
  Text,
  UnorderedList,
  VStack,
  Link as ChakraLink,
} from '@chakra-ui/react';

import { getDiagnoses } from '../../api';

const AppointmentsHistory = function () {
  const doctorId = useSelector(state => state.doctor.id);
  const { isLoading, data, isError } = useQuery(
    ['diagnoses'],
    () => getDiagnoses(doctorId),
    { enabled: !!doctorId },
  );
  console.log(data);

  return (
    <Box height="full" overflow="hidden">
      <Heading as="h1">완료된 진료</Heading>
      <VStack marginTop="8" width="full">
        <HStack width="full" fontSize="lg" fontWeight="bold">
          <Text flex={1} textAlign="center" py="4">
            이름
          </Text>
          <Text flex={1} textAlign="center" py="4">
            진료 일자
          </Text>
          <Text flex={1} textAlign="center" py="4">
            전화번호
          </Text>
        </HStack>
        <UnorderedList
          width="full"
          listStyleType="none"
          margin="0"
          spacing="4"
          height="sm"
          overflowY="scroll"
        >
          {isLoading ? (
            <ListSkeletion />
          ) : (
            <>
              {data?.map(diagnosis => (
                <ListItem cursor="pointer" key={diagnosis.id}>
                  <ChakraLink
                    as={ReactRouterLink}
                    to={`/appointments-history/${diagnosis.id}`}
                    textDecoration="none !important"
                  >
                    <HStack
                      width="full"
                      py="4"
                      bgColor="primary.100"
                      borderRadius="md"
                    >
                      <Text textAlign="center" flex={1}>
                        {diagnosis.patientName}
                      </Text>
                      <Text textAlign="center" flex={1}>
                        {diagnosis.date}
                      </Text>
                      <Text textAlign="center" flex={1}>
                        010-{Math.floor(diagnosis.phoneNumber / 10000)}-
                        {diagnosis.phoneNumber % 10000}
                      </Text>
                    </HStack>
                  </ChakraLink>
                </ListItem>
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

export default AppointmentsHistory;
