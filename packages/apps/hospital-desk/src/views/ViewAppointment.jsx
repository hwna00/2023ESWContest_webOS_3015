import { useEffect, useMemo, useState } from 'react';

import { useNavigate } from 'react-router-dom';
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
} from '@chakra-ui/react';

import TableRow from '../component/TableSection/TableRow';
import TableHeader from '../component/TableSection/TableHeader';
import Calendar from '../component/Calendar/Calendar';
import { getAppointments } from '../api';
import LoadingPage from '@housepital/common/LoadingPage';
import { useSelector } from 'react-redux';

function ViewAppointment() {
  const hospital = useSelector(state => state.hospital);
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

  const {
    data = { aw: [], ac: [], dc: [], pc: [], ar: [] },
    isLoading,
    error,
  } = useQuery([hospital.id], getAppointments);

  const allReservations = useMemo(
    () => [...data.aw, ...data.ac, ...data.dc, ...data.pc, ...data.ar],
    [data.aw, data.ac, data.dc, data.pc, data.ar],
  );

  const navigate = useNavigate();
  useEffect(() => {
    if (allReservations) {
      console.log('모든예약', allReservations);
      if (viewType === 'viewAll') {
        setFilteredReservations(
          allReservations.filter(reservation =>
            dayjs(`${reservation.date} ${reservation.time}`).isSame(day, 'day'),
          ),
        );
      } else if (viewType === 'viewSelection') {
        setFilteredReservations(
          allReservations.filter(reservation => {
            if (
              !dayjs(`${reservation.date} ${reservation.time}`).isSame(
                day,
                'day',
              )
            )
              return false;

            const reservationHour = reservation.time.split(':')[0];
            const reservationMinute = reservation.time.split(':')[1];

            if (selectedHour && reservationHour !== selectedHour) return false;

            if (selectedMinute && reservationMinute !== selectedMinute)
              return false;
            if (selectedState && reservation.stateId !== selectedState)
              return false;

            if (selectedDoctor && reservation.doctorId !== selectedDoctor)
              return false;
            if (nftType === 'FTF') return reservation.isNFTF === 1;
            if (nftType === 'NFTF') return reservation.isNFTF === 0;
            return true;
          }),
        );
      }
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
    allReservations,
  ]);

  useEffect(() => {
    if (allReservations && viewType === 'viewSelection') {
      setUniqueDoctors(
        Array.from(
          allReservations
            .reduce(
              (map, reservation) =>
                map.set(reservation.doctorId, reservation.doctorName),
              new Map(),
            )
            .entries(),
        ).map(([doctorId, doctorName]) => ({ doctorId, doctorName })),
      );

      setUniqueHours(
        Array.from(
          allReservations.reduce((set, reservation) => {
            const hour = reservation.time.split(':')[0];
            return set.add(hour);
          }, new Set()),
        ),
      );
    }
  }, [allReservations, viewType]);

  useEffect(() => {
    if (error) {
      navigate('/error-page');
    }
  }, [error, navigate]);

  useEffect(() => {
    setFilteredReservations();
  }, []);

  useEffect(() => {
    console.log('필터링된 예약: ', filteredReservations);
  }, [filteredReservations]);

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
            <Box w="480px" h="750px" border="1px" borderColor="black">
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
                          onChange={e => {
                            const num = Number(e.target.value);
                            if (!isNaN(num)) {
                              setSelectedDoctor(num);
                            }
                          }}
                        >
                          {uniqueDoctors.map(doctor => (
                            <option
                              key={doctor.doctorId}
                              value={doctor.doctorId}
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
      ) : (
        <LoadingPage />
      )}
    </>
  );
}

export default ViewAppointment;
