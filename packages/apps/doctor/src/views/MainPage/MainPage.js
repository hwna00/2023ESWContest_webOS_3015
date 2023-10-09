import { useSelector } from 'react-redux';
import { useQuery } from '@tanstack/react-query';
import ReviewList from '@housepital/common/ReviewList/ReviewList';
import {
  Box,
  HStack,
  Heading,
  ListItem,
  Skeleton,
  Tag,
  Text,
  UnorderedList,
  VStack,
} from '@chakra-ui/react';

import { getAppointments } from '../../api';

const MainPage = function () {
  const me = useSelector(state => state.doctor);
  // TODO: doctor_id를 id로 변경해야 함
  const {
    isLoading,
    data: appointments,
    isError,
  } = useQuery(['appointments'], getAppointments(me.doctor_id));

  return (
    <HStack justifyContent="center" gap="12" height="full" overflowY="hidden">
      <Box flex={1}>
        <Heading as="h2" fontSize="3xl" mb="6">
          예약된 진료
        </Heading>
        <UnorderedList
          listStyleType="none"
          margin={0}
          spacing="4"
          height="96"
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
              {isError && (
                <ListItem textAlign="center">
                  예약을 불러올 수 없습니다.
                </ListItem>
              )}
              {appointments?.map(appointment => (
                <VStack
                  as="li"
                  key={appointment.id}
                  padding="4"
                  bgColor="primary.200"
                  gap="2"
                >
                  <Text fontSize="lg">예약자: {appointment.patientName}</Text>
                  <Text>
                    예약 시간: {appointment.date} {appointment.time}
                  </Text>
                  <Tag>{appointment.isNFTF}</Tag>
                </VStack>
              ))}
            </>
          )}
        </UnorderedList>
      </Box>
      <Box flex={1}>
        <Heading as="h2" fontSize="3xl" mb="6">
          최근 리뷰
        </Heading>
        <ReviewList reviews={me.reviews} height="96" />
      </Box>
    </HStack>
  );
};

export default MainPage;
