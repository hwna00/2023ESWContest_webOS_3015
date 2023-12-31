import { useEffect, useState } from 'react';

import { Link as ReactRouterLink, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import styles from '@housepital/common/css/HideScrollBar.module.css';
import {
  Box,
  HStack,
  Heading,
  Link as ChakraLink,
  VStack,
} from '@chakra-ui/react';
import dayjs from 'dayjs';
import TableRow from '../component/TableSection/TableRow';
import TableHeader from '../component/TableSection/TableHeader';
import { getAppointments } from '../api';
import LoadingPage from '@housepital/common/LoadingPage';
import { useSelector } from 'react-redux';

function ManageAppointment() {
  const hospital = useSelector(state => state.hospital);
  const [ConfirmedReservation, setConfirmedReservation] = useState([]);
  const [NotConfirmedReservation, setNotConfirmedReservation] = useState([]);
  const { data, isLoading, error } = useQuery([hospital.id], getAppointments);

  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading) {
      const sortedConfirmed = (
        data?.ac?.filter(reservation => reservation.stateId === 'ac') || []
      ).sort((a, b) =>
        dayjs(`${a.date} ${a.time}`).isBefore(dayjs(`${b.date} ${b.time}`))
          ? -1
          : 1,
      );
      setConfirmedReservation(sortedConfirmed);
      const sortedNotConfirmed = (
        data?.aw?.filter(reservation => reservation.stateId === 'aw') || []
      ).sort((a, b) =>
        dayjs(`${a.date} ${a.time}`).isBefore(dayjs(`${b.date} ${b.time}`))
          ? 1
          : -1,
      );
      setNotConfirmedReservation(sortedNotConfirmed);
    }
    if (error) {
      navigate('/error-page');
    }
  }, [data, isLoading, navigate, error]);

  return (
    <>
      {!isLoading ? (
        <VStack p="8" spacing="8" alignItems="initial">
          <HStack justifyContent="space-between">
            <Heading textAlign="left" p="4" fontSize="30px">
              예약관리
            </Heading>
          </HStack>
          <Box>
            <HStack justifyContent="space-between">
              <Heading fontSize="25px">확정된 예약(최신순)</Heading>
              <ChakraLink as={ReactRouterLink} to="/view-appointment">
                + 전체보기
              </ChakraLink>
            </HStack>
            <TableHeader
              tableHeaders={['이름', '진료시간', '타입', '담당의사', '액션']}
            />

            <div className={styles.hideScrollBar}>
              <Box maxH="250px" overflowY="scroll">
                {ConfirmedReservation.map(reservation => (
                  <TableRow
                    key={reservation.id}
                    data={reservation}
                    buttonType="cancel"
                  />
                ))}
              </Box>
            </div>
          </Box>
          <Box>
            <HStack justifyContent="space-between">
              <Heading fontSize="25px">들어온 예약(오래된 순)</Heading>
              <ChakraLink as={ReactRouterLink} to="/view-appointment">
                + 전체보기
              </ChakraLink>
            </HStack>
            <TableHeader
              tableHeaders={[
                '이름',
                '진료시간',
                '타입',
                '담당의사',
                '상세정보 확인',
              ]}
            />

            <div className={styles.hideScrollBar}>
              <Box maxH="250px" overflowY="scroll">
                <Box maxH="250px" overflowY="scroll">
                  {NotConfirmedReservation.map(reservation => (
                    <TableRow
                      key={reservation.id}
                      data={reservation}
                      buttonType="detailAndCancel"
                    />
                  ))}
                </Box>
              </Box>
            </div>
          </Box>
        </VStack>
      ) : (
        <LoadingPage />
      )}
    </>
  );
}

export default ManageAppointment;
