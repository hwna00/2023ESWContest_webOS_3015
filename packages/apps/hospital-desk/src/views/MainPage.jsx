import React, { useEffect, useState } from 'react';

import { Link as ReactRouterLink } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import styles from '@housepital/common/css/HideScrollBar.module.css';
import {
  Box,
  HStack,
  Heading,
  SimpleGrid,
  VStack,
  Link as ChakraLink,
} from '@chakra-ui/react';

import TableRow from '../component/TableSection/TableRow';
import TableHeader from '../component/TableSection/TableHeader';
import StatisticCard from '../component/StatisticCard/StatisticCard';
import { getAppointments } from '../api';

const MainPage = function () {
  const { data, isLoading } = useQuery(['appointments'], getAppointments);

  const [CompleteReservation, setCompleteReservation] = useState([]);
  const [ConfirmedReservation, setConfirmedReservation] = useState([]);

  useEffect(() => {
    if (!isLoading) {
      setConfirmedReservation(
        data.filter(reservation => reservation.state_id === 'ac'),
      );
      setCompleteReservation(
        data.filter(reservation => reservation.state_id === 'dc'),
      );
    }
  }, [data, isLoading]);

  return (
    <VStack p="8" spacing="8" alignItems="initial">
      <Heading textAlign="left" p="4" fontSize="30px">
        병원이름
      </Heading>
      <Box>
        <SimpleGrid w="full" spacing="8" placeItems="center" columns={3}>
          <StatisticCard title="오늘 예정된 예약" count={13} />
          <StatisticCard title="완료 대기" count={4} />
          <StatisticCard title="전체 환자" count={17} />
        </SimpleGrid>
      </Box>
      <Box>
        <HStack justifyContent="space-between">
          <Heading fontSize="25px">다음 예약</Heading>
          <ChakraLink as={ReactRouterLink} to="manage-appointment">
            + 전체보기
          </ChakraLink>
        </HStack>
        <TableHeader
          tableHeaders={[
            '이름',
            '전화번호',
            '진료시간',
            '타입',
            '담당의사',
            '액션',
          ]}
        />

        <div className={styles.hideScrollBar}>
          <Box maxH="135px" overflowY="scroll">
            {ConfirmedReservation.filter(
              reservation => reservation.confirm === true,
            ).map(reservation => (
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
          <Heading fontSize="25px">완료 대기</Heading>
          <ChakraLink as={ReactRouterLink} to="/manage-appointment">
            + 전체보기
          </ChakraLink>
        </HStack>

        <TableHeader
          tableHeaders={[
            '이름',
            '전화번호',
            '진료시간',
            '타입',
            '담당의사',
            '결제상태',
          ]}
        />
        <div className={styles.hideScrollBar}>
          <Box maxH="135px" overflowY="scroll">
            {CompleteReservation.map(reservation => (
              <TableRow
                key={reservation.id}
                data={reservation}
                buttonType="payment"
              />
            ))}
          </Box>
        </div>
      </Box>
    </VStack>
  );
};

export default MainPage;