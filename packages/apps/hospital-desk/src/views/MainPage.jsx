import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { Link as ReactRouterLink, useNavigate } from 'react-router-dom';
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
import StatisticCard from '../component/StatisticCard';
import { getAppointments } from '../api';
import LoadingPage from '@housepital/common/LoadingPage';
import { useSelector } from 'react-redux';

const MainPage = function () {
  const hospital = useSelector(state => state.hospital);
  const [completeReservation, setCompleteReservation] = useState([]);
  const [ConfirmedReservation, setConfirmedReservation] = useState([]);
  const { data, isLoading, error } = useQuery([hospital.id], getAppointments);
  const navigate = useNavigate();

  useEffect(() => {
    if (data && !error) {
      setConfirmedReservation(data?.ac || []);
      setCompleteReservation(data?.dc || []);
    }
    if (error) {
      navigate('/error-page');
    }
  }, [data, error, navigate]);

  const now = dayjs().format('YYYY-MM-DD');

  return (
    <>
      {!isLoading ? (
        <VStack p="8" spacing="8" alignItems="initial">
          <Heading textAlign="left" p="4" fontSize="30px">
            {hospital.name}
          </Heading>
          <Box>
            <SimpleGrid w="full" spacing="8" placeItems="center" columns={3}>
              <StatisticCard
                title="오늘 예정된 예약"
                count={
                  ConfirmedReservation.filter(reservation =>
                    dayjs(reservation.date).isSame(now),
                  ).length
                }
              />
              <StatisticCard
                title="완료 대기"
                count={completeReservation.length}
              />
              <StatisticCard
                title="전체 환자"
                count={
                  [
                    ...(Array.isArray(data?.aw) ? data.aw : []),
                    ...(Array.isArray(data?.ac) ? data.ac : []),
                    ...(Array.isArray(data?.dc) ? data.dc : []),
                    ...(Array.isArray(data?.pc) ? data.pc : []),
                  ].length
                }
              />
            </SimpleGrid>
          </Box>
          <Box>
            <HStack justifyContent="space-between">
              <Heading fontSize="25px">다음 예약</Heading>
              <ChakraLink as={ReactRouterLink} to="/view-appointment">
                + 전체보기
              </ChakraLink>
            </HStack>
            <TableHeader
              tableHeaders={['이름', '진료시간', '타입', '담당의사', '액션']}
            />

            <div className={styles.hideScrollBar}>
              <Box maxH="135px" overflowY="scroll">
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
              <Heading fontSize="25px">완료 대기</Heading>
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
                '결제상태',
              ]}
            />
            <div className={styles.hideScrollBar}>
              <Box maxH="135px" overflowY="scroll">
                {completeReservation.map(reservation => (
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
      ) : (
        <LoadingPage />
      )}
    </>
  );
};

export default MainPage;
