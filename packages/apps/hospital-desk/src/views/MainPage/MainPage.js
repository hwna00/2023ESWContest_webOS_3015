import React from 'react';

import { Link as ReactRouterLink } from 'react-router-dom';
import { css } from '@emotion/react';
import {
  Box,
  HStack,
  Heading,
  SimpleGrid,
  VStack,
  Link as ChakraLink,
} from '@chakra-ui/react';

import TableRow from '../../component/TableSection/TableRow';
import TableHeader from '../../component/TableSection/TabelHeader';
import StatisticCard from '../../component/StatisticCard/StatisticCard';

import { CompleteReservation, ConfirmedReservation } from './Data';

const MainPage = function () {
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
          <ChakraLink as={ReactRouterLink} to="/">
            + 전체보기
          </ChakraLink>
        </HStack>
        <TableHeader
          headers={['이름', '전화번호', '진료시간', '타입', '액션']}
        />

        <Box
          maxH="135px"
          overflowY="scroll"
          css={css`
            /* Hide scrollbar for Chrome, Safari and Opera */
            ::-webkit-scrollbar {
              display: none;
            }

            /* Hide scrollbar for IE, Edge and Firefox */
            -ms-overflow-style: none; /* IE and Edge */
            scrollbar-width: none; /* Firefox */
          `}
        >
          {ConfirmedReservation.map((reservation, index) => (
            <TableRow key={index} data={reservation} />
          ))}
        </Box>
      </Box>
      <Box>
        <HStack justifyContent="space-between">
          <Heading fontSize="25px">완료 대기</Heading>
          <ChakraLink as={ReactRouterLink} to="/">
            + 전체보기
          </ChakraLink>
        </HStack>

        <TableHeader
          headers={['이름', '전화번호', '진료시간', '타입', '결제상태']}
        />
        <Box
          maxH="135px"
          overflowY="scroll"
          css={css`
            /* Hide scrollbar for Chrome, Safari and Opera */
            ::-webkit-scrollbar {
              display: none;
            }

            /* Hide scrollbar for IE, Edge and Firefox */
            -ms-overflow-style: none; /* IE and Edge */
            scrollbar-width: none; /* Firefox */
          `}
        >
          {CompleteReservation.map((reservation, index) => (
            <TableRow key={index} data={reservation} />
          ))}
        </Box>
      </Box>
    </VStack>
  );
};

export default MainPage;
