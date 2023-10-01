import React, { useState } from 'react';

import { AiFillPlusCircle } from 'react-icons/ai';
import dayjs from 'dayjs';
import 'react-calendar/dist/Calendar.css';
import styles from '@housepital/common/css/HideScrollBar.module.css';
import { Box, Button, HStack, Heading, VStack } from '@chakra-ui/react';

import { ConfirmedReservation } from '../MainPage/Data';
import TableRow from '../../component/TableSection/TableRow';
import TableHeader from '../../component/TableSection/TableHeader';
import Calendar from '../../component/Calendar/Calendar';

function ViewAppointment() {
  const [value, onChange] = useState(new Date());
  const [day, setDay] = useState(new Date());

  const filteredReservations = ConfirmedReservation.filter(reservation =>
    dayjs(reservation.date_time).isSame(day, 'day'),
  );
  return (
    <VStack p="8" spacing="8" alignItems="initial" w="100%">
      <HStack justifyContent="space-between">
        <Heading textAlign="left" p="4" fontSize="30px">
          예약 전체보기
        </Heading>
        <Button colorScheme="primary" leftIcon={<AiFillPlusCircle />}>
          예약추가
        </Button>
      </HStack>
      <HStack
        justifyItems="initial"
        alignItems="unset"
        justifyContent="space-between"
      >
        <Box w="480px" h="870px" border="1px" borderColor="black">
          <Calendar
            selectedDay={day}
            setSelectedDay={setDay}
            onChange={onChange}
            value={value}
          />
        </Box>
        <VStack w="700px" alignItems="unset">
          <TableHeader
            tableHeaders={[
              '이름',
              '전화번호',
              '예약시간',
              '타입',
              '담당의사',
              '상세정보',
            ]}
          />
          <div className={styles.hideScrollBar}>
            <Box maxH="830px" overflowY="scroll" w="100%">
              {filteredReservations.map(reservation => (
                <TableRow
                  key={reservation.id}
                  data={reservation}
                  buttonType="detail"
                />
              ))}
            </Box>
          </div>
        </VStack>
      </HStack>
    </VStack>
  );
}

export default ViewAppointment;
