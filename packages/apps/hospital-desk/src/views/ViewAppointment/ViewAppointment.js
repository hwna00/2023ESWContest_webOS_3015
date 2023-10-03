import React, { useState } from 'react';

import { AiFillPlusCircle } from 'react-icons/ai';
import dayjs from 'dayjs';
import 'react-calendar/dist/Calendar.css';
import { useQuery } from '@tanstack/react-query';
import styles from '@housepital/common/css/HideScrollBar.module.css';
import {
  Box,
  Button,
  HStack,
  Heading,
  Radio,
  RadioGroup,
  Select,
  SimpleGrid,
  VStack,
  useDisclosure,
} from '@chakra-ui/react';

import TableRow from '../../component/TableSection/TableRow';
import TableHeader from '../../component/TableSection/TableHeader';
import Calendar from '../../component/Calendar/Calendar';
import AddAppointmentModal from '../../component/AddAppointmentModal/AddAppointmentModal';
import { getAppointments } from '../../api';

function ViewAppointment() {
  const {
    isOpen: isAddModalOpen,
    onOpen: openAddAppointmentModal,
    onClose: closeAddAppointmentModal,
  } = useDisclosure();
  const [value, onChange] = useState(new Date());
  const [day, setDay] = useState(new Date());
  const [filter, setFilter] = useState('viewAll');
  const [filterType, setFilterType] = useState('FTF');

  const { data } = useQuery(['appointments'], getAppointments);

  let filteredReservations = [];
  let uniqueDoctors = [];
  let uniqueHours = [];
  if (data) {
    filteredReservations = data.filter(reservation =>
      dayjs(reservation.date_time).isSame(day, 'day'),
    );
    uniqueDoctors = Array.from(
      data.reduce(
        (map, reservation) =>
          map.set(reservation.doctor_id, reservation.doctorName),
        new Map(),
      ),
    ).map(([doctor_id, doctorName]) => ({ doctor_id, doctorName }));
    uniqueHours = Array.from(
      data.reduce(
        (set, reservation) =>
          set.add(dayjs(reservation.date_time).format('HH')),
        new Set(),
      ),
    );
  }

  return (
    <VStack p="8" spacing="8" alignItems="initial" w="100%">
      <HStack justifyContent="space-between">
        <Heading textAlign="left" p="4" fontSize="30px">
          예약 전체보기
        </Heading>
        <Button
          colorScheme="primary"
          leftIcon={<AiFillPlusCircle />}
          onClick={openAddAppointmentModal}
        >
          예약추가
        </Button>
        <AddAppointmentModal
          isOpen={isAddModalOpen}
          onClose={closeAddAppointmentModal}
        />
      </HStack>
      <HStack
        justifyItems="initial"
        alignItems="unset"
        justifyContent="space-between"
      >
        <Box w="480px" h="870px" border="1px" borderColor="black">
          <Box w="full" h="500px" border="0" borderColor="transparent">
            <Calendar
              selectedDay={day}
              setSelectedDay={setDay}
              onChange={onChange}
              value={value}
            />
          </Box>
          <RadioGroup onChange={setFilter} value={filter}>
            <VStack alignItems="initial" p="6" spacing="2">
              <Radio value="viewAll">전체보기</Radio>
              <Radio value="viewSelection">선택보기</Radio>
              <RadioGroup onChange={setFilterType} value={filterType}>
                <HStack>
                  <Radio value="FTF">대면</Radio>
                  <Radio value="NFTF">비대면</Radio>
                </HStack>
                <SimpleGrid columns={2} spacing={4}>
                  <Select placeholder="시간">
                    {uniqueHours.map(hour => (
                      <option key={hour}>{hour}</option>
                    ))}
                  </Select>
                  <Select placeholder="분">
                    <option>00분</option>
                    <option>30분</option>
                  </Select>
                  <Select placeholder="예약상태">
                    <option key="aw" value="aw">
                      예약 미확정
                    </option>
                    <option key="ac" value="ac">
                      예약 확정
                    </option>
                    <option key="dc" value="dc">
                      진료 완료
                    </option>
                    <option key="pc" value="pc">
                      결제 완료
                    </option>
                  </Select>
                  <Select placeholder="담당의사">
                    {uniqueDoctors.map(doctor => (
                      <option key={doctor.doctor_id}>
                        {doctor.doctorName}
                      </option>
                    ))}
                  </Select>
                </SimpleGrid>
              </RadioGroup>
            </VStack>
          </RadioGroup>
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
