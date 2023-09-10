import React, { useState } from 'react';

import { Flex, Box, VStack, HStack, Divider } from '@chakra-ui/react';

import BackButton from '../../../components/BackButton/BackButton';

import WaitingItem from './WaitingItem';

function WaitingRoom() {
  const [AppointmentList, setAppointmentList] = useState([
    {
      date: '7월 28일 금요일 16:30',
      name: '양지웅',
      hospital: '밝은안과',
    },
    {
      date: '7월 30일 일요일 16:30',
      name: '김종석',
      hospital: '연세안새로운내과',
    },
    {
      date: '8월 27일 일요일 10:30',
      name: '서진형',
      hospital: '튼튼치과',
    },
    {
      date: '8월30일 일요일16시30분',
      name: '김재인',
      hospital: '이비인후과',
    },
    {
      date: '9월1일 월요일13시30분',
      name: '송보경',
      hospital: '손발척척정형외과',
    },
    {
      date: '10월3일 일요일18시30분',
      name: '하철환',
      hospital: '연피부과',
    },
  ]);

  const cancelAppointment = index => {
    if (window.confirm('예약을 취소하시겠습니까?')) {
      setAppointmentList(prevAppointments =>
        prevAppointments.filter((appointment, i) => i !== index),
      );
    }
  };

  return (
    <div>
      <Flex>
        <BackButton title="대기실" />
      </Flex>
      <VStack mx="5" align="stretch">
        <HStack mt="7" mb="-2" justifyContent="space-evenly">
          <Box width="48" textAlign="center" fontWeight="bold">
            예약 일시
          </Box>
          <Box width="48" textAlign="center" fontWeight="bold">
            병원
          </Box>
          <Box width="48" textAlign="center" fontWeight="bold">
            의사
          </Box>
          <Box width="20" />
        </HStack>
        <Divider h="0.5" mb="1" bgColor="black" />
        <Box
          display="flex"
          flexDirection="column"
          gap="3"
          h="470"
          overflowY="scroll"
        >
          {AppointmentList.map((appointment, index) => (
            <WaitingItem
              key={index}
              waiting={appointment}
              index={index}
              cancelAppointment={cancelAppointment}
            />
          ))}
        </Box>
      </VStack>
    </div>
  );
}

export default WaitingRoom;
