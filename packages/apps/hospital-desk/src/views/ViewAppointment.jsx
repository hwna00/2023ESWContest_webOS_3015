import React, { useEffect, useState } from 'react';

import { Link as ReactRouterLink, useNavigate } from 'react-router-dom';
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
  Link as ChakraLink,
} from '@chakra-ui/react';

import TableRow from '../component/TableSection/TableRow';
import TableHeader from '../component/TableSection/TableHeader';
import Calendar from '../component/Calendar/Calendar';
import { getAppointments } from '../api';
import LoadingPage from '@housepital/common/LoadingPage';

function ViewAppointment() {
  const [value, onChange] = useState(new Date());
  const [day, setDay] = useState(new Date());
  const [viewType, setViewType] = useState('viewAll');
  const [nftType, setNftType] = useState('All');
  const [selectedHour, setSelectedHour] = useState();
  const [selectedMinute, setSelectedMinute] = useState();
  const [selectedDoctor, setSelectedDoctor] = useState();
  const [selectedState, setSelectedState] = useState();
  const [filteredReservations, setFilteredReservations] = useState([]);
  const [uniqueDoctors, setUniqueDoctors] = useState([]);
  const [uniqueHours, setUniqueHours] = useState([]);

  const { data, isLoading, error } = useQuery(
    ['appointments'],
    getAppointments,
  );
  const navigate = useNavigate();
  useEffect(() => {
    if (!isLoading) {
      if (viewType === 'viewAll') {
        setFilteredReservations(
          data.filter(reservation =>
            dayjs(reservation.date_time).isSame(day, 'day'),
          ),
        );
      } else if (viewType === 'viewSelection') {
        setFilteredReservations(
          data.filter(reservation => {
            if (!dayjs(reservation.date_time).isSame(day, 'day')) return false;

            const reservationDateTime = dayjs(reservation.date_time);

            if (
              selectedHour &&
              reservationDateTime.format('HH') !== selectedHour
            )
              return false;

            if (
              selectedMinute &&
              reservationDateTime.format('mm') !== selectedMinute
            )
              return false;

            if (selectedState && reservation.state_id !== selectedState)
              return false;

            if (selectedDoctor && reservation.doctor_id !== selectedDoctor)
              return false;
            if (nftType === 'FTF') return reservation.is_NFTF === false;
            if (nftType === 'NFTF') return reservation.is_NFTF === true;
            return true;
          }),
        );
        setUniqueDoctors(
          Array.from(
            data.reduce(
              (map, reservation) =>
                map.set(reservation.doctor_id, reservation.doctorName),
              new Map(),
            ),
          ),
        ).map(([doctor_id, doctorName]) => ({ doctor_id, doctorName }));
        setUniqueHours(
          Array.from(
            data.reduce(
              (set, reservation) =>
                set.add(dayjs(reservation.date_time).format('HH')),
              new Set(),
            ),
          ),
        );
      }
    }
    if (error) {
      navigate('/error-page');
    }
  }, [
    isLoading,
    viewType,
    day,
    selectedHour,
    selectedMinute,
    selectedState,
    selectedDoctor,
    nftType,
    data,
    error,
    navigate,
  ]);

  return (
    <>
      {!isLoading ? (
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
              <Box w="full" h="500px" border="0" borderColor="transparent">
                <Calendar
                  selectedDay={day}
                  setSelectedDay={setDay}
                  onChange={onChange}
                  value={value}
                />
              </Box>
              <RadioGroup onChange={setViewType} value={viewType}>
                <VStack alignItems="initial" p="6" spacing="2">
                  <Radio value="viewAll">전체보기</Radio>
                  <Radio value="viewSelection">선택보기</Radio>
                  {viewType === 'viewSelection' && (
                    <>
                      <RadioGroup onChange={setNftType} value={nftType}>
                        <HStack>
                          <Radio value="ALl">모두 보기</Radio>
                          <Radio value="FTF">대면</Radio>
                          <Radio value="NFTF">비대면</Radio>
                        </HStack>
                      </RadioGroup>
                      <SimpleGrid columns={2} spacing={4}>
                        <Select
                          placeholder="시"
                          value={selectedHour}
                          onChange={e => setSelectedHour(e.target.value)}
                        >
                          {uniqueHours.map(hour => (
                            <option key={hour} value={hour}>
                              {hour}
                            </option>
                          ))}
                        </Select>
                        <Select
                          placeholder="분"
                          value={selectedMinute}
                          onChange={e => setSelectedMinute(e.target.value)}
                        >
                          <option key="00" value="00">
                            00분
                          </option>
                          <option key="30" value="30">
                            30분
                          </option>
                        </Select>
                        <Select
                          placeholder="예약 상태"
                          value={selectedState}
                          onChange={e => setSelectedState(e.target.value)}
                        >
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
                        <Select
                          placeholder="담당 의사"
                          value={selectedDoctor}
                          onChange={e => setSelectedDoctor(e.target.value)}
                        >
                          {uniqueDoctors.map(doctor => (
                            <option
                              key={doctor.doctor_id}
                              value={doctor.doctor_id}
                            >
                              {doctor.doctorName}
                            </option>
                          ))}
                        </Select>
                      </SimpleGrid>
                    </>
                  )}
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
                    <ChakraLink
                      as={ReactRouterLink}
                      to={`appointment-detail/${reservation.id}`}
                      key={reservation.id}
                    >
                      <TableRow
                        key={reservation.id}
                        data={reservation}
                        buttonType="detail"
                      />
                    </ChakraLink>
                  ))}
                </Box>
              </div>
            </VStack>
          </HStack>
        </VStack>
      ) : (
        <LoadingPage />
      )}
    </>
  );
}

export default ViewAppointment;
