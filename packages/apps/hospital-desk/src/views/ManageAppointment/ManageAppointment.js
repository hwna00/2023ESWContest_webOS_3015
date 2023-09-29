import { Link as ReactRouterLink } from 'react-router-dom';
import { AiFillPlusCircle } from 'react-icons/ai';
import styles from '@housepital/common/css/HideScrollBar.module.css';
import {
  Box,
  HStack,
  Heading,
  Link as ChakraLink,
  VStack,
  Button,
} from '@chakra-ui/react';

import { ConfirmedReservation } from '../MainPage/Data';
import TableRow from '../../component/TableSection/TableRow';
import TableHeader from '../../component/TableSection/TableHeader';

function ManageAppointment() {
  return (
    <VStack p="8" spacing="8" alignItems="initial">
      <HStack justifyContent="space-between">
        <Heading textAlign="left" p="4" fontSize="30px">
          예약관리
        </Heading>
        <Button colorScheme="primary" leftIcon={<AiFillPlusCircle />}>
          예약추가
        </Button>
      </HStack>
      <Box>
        <HStack justifyContent="space-between">
          <Heading fontSize="25px">확정된 예약(최신순)</Heading>
          <ChakraLink as={ReactRouterLink} to="/">
            + 전체보기
          </ChakraLink>
        </HStack>
        <TableHeader
          tableHeaders={['이름', '전화번호', '진료시간', '타입', '액션']}
        />

        <div className={styles.hideScrollBar}>
          <Box maxH="250px" overflowY="scroll">
            {ConfirmedReservation.filter(
              reservation => reservation.confirm === true,
            ).map(reservation => (
              <TableRow key={reservation.uid} data={reservation} />
            ))}
          </Box>
        </div>
      </Box>
      <Box>
        <HStack justifyContent="space-between">
          <Heading fontSize="25px">들어온 예약(오래된 순)</Heading>
          <ChakraLink as={ReactRouterLink} to="/">
            + 전체보기
          </ChakraLink>
        </HStack>
        <TableHeader
          tableHeaders={[
            '이름',
            '전화번호',
            '진료시간',
            '타입',
            '상세정보 확인',
          ]}
        />

        <div className={styles.hideScrollBar}>
          <Box maxH="250px" overflowY="scroll">
            <Box maxH="250px" overflowY="scroll">
              {ConfirmedReservation.filter(
                reservation => reservation.confirm === false,
              ).map(reservation => (
                <TableRow key={reservation.uid} data={reservation} />
              ))}
            </Box>
          </Box>
        </div>
      </Box>
    </VStack>
  );
}

export default ManageAppointment;
