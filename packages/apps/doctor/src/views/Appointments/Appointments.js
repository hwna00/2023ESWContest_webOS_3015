import { useSelector } from 'react-redux';
import { useQuery } from '@tanstack/react-query';
import ListSkeletion from '@housepital/common/ListSkeleton';
import styles from '@housepital/common/css/HideScrollBar.module.css';
import { Box, Heading, Text, UnorderedList, VStack } from '@chakra-ui/react';

import AppointmentListItem from '../../components/AppointmentListItem/AppointmentListItem';
import AppointmentListHeader from '../../components/AppointmentListHeader/AppointmentListHeader';
import { getAppointments } from '../../api';

const Appointments = function () {
  const me = useSelector(state => state.doctor);
  const {
    isLoading,
    data: appointments,
    isError,
  } = useQuery(['appointments'], () => getAppointments(me.id));

  return (
    <Box height="full" overflow="hidden">
      <Heading as="h1">예약된 진료</Heading>
      <VStack marginTop="8" width="full">
        <AppointmentListHeader />
        <div className={styles.hideScrollBar} style={{ width: '100%' }}>
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
                {appointments?.map(appointment => (
                  <AppointmentListItem
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
        </div>
      </VStack>
    </Box>
  );
};

export default Appointments;
