import { useEffect } from 'react';

import { Link as ReactRouterLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useQuery } from '@tanstack/react-query';
import ReviewList from '@housepital/common/ReviewList/ReviewList';
import ListSkeletion from '@housepital/common/ListSkeleton';
import styles from '@housepital/common/css/HideScrollBar.module.css';
import LS2Request from '@enact/webos/LS2Request';
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

import { getAppointments } from '../../api';

const bridge = new LS2Request();

const MainPage = function () {
  const me = useSelector(state => state.doctor);
  const {
    isLoading,
    data: appointments = [],
    isError,
  } = useQuery(['appointments'], () => getAppointments(me.id), {
    enabled: !!me.id,
  });

  const onLsClick = () => {
    console.log('onLsClick');
    const lsRequest = {
      service: 'com.housepital.doctor.app.service',
      method: 'createNotification',
      parameters: {
        datetpayloadime: { message: '테스트입니다.' },
      },
      onSuccess: res => console.log('success', res),
      onFailure: res => console.log('fail', res),
    };
    console.log(lsRequest);
    bridge.send(lsRequest);
  };

  useEffect(() => {
    appointments.map(appointment => {
      const lsRequest = {
        service: 'com.housepital.doctor.app.service',
        method: 'createAppointmentActivity',
        parameters: {
          activityname: `${me.id}-${appointment.uid}-${appointment.date}-${appointment.time}`,
          datetime: `${appointment.date} ${appointment.time}:00`,
        },
        onSuccess: res => console.log('success', res),
        onFailure: res => console.log('fail', res),
      };
      console.log(lsRequest);
      bridge.send(lsRequest);
      return lsRequest;
    });
  }, [appointments]);

  return (
    <HStack justifyContent="center" gap="12" height="full" overflowY="hidden">
      <Box flex={1}>
        <Heading as="h2" fontSize="3xl" mb="6">
          예약된 진료
        </Heading>
        <div className={styles.hideScrollBar}>
          <UnorderedList
            listStyleType="none"
            margin={0}
            spacing="4"
            height="96"
            overflowY="scroll"
          >
            {isLoading ? (
              <ListSkeletion />
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
                    bgColor="primary.100"
                    gap="2"
                    borderRadius="md"
                    alignItems="flex-start"
                  >
                    <ChakraLink
                      width="full"
                      as={ReactRouterLink}
                      to={`/appointments/${appointment.id}`}
                      textDecoration="none !important"
                    >
                      <Text fontWeight="bold">
                        예약자: {appointment.patientName}
                      </Text>
                      <Text>
                        예약 시간: {appointment.date} {appointment.time}
                      </Text>
                    </ChakraLink>
                  </VStack>
                ))}
              </>
            )}
          </UnorderedList>
        </div>
      </Box>
      <Box flex={1}>
        <Heading as="h2" fontSize="3xl" mb="6" onClick={onLsClick}>
          최근 리뷰
        </Heading>
        <ReviewList reviews={me.reviews} height="96" />
      </Box>
    </HStack>
  );
};

export default MainPage;
