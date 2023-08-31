import { Box, Button, Divider, HStack, VStack } from '@chakra-ui/react';
import { useState } from 'react';

const AppointmentHistory = function () {
  const [histories, setHistories] = useState([
    {
      prescriptionDate: '2023.07.31',
      hospitalName: '힘내라힘 병원',
      pharmacyName: '다나아 약국',
      favorites: '등록',
    },
    {
      prescriptionDate: '2023.07.20',
      hospitalName: '힘내라힘 병원',
      pharmacyName: '다나아 약국',
      favorites: '등록',
    },
    {
      prescriptionDate: '2023.07.23',
      hospitalName: '힘내라힘 병원',
      pharmacyName: '다나아 약국',
      favorites: '등록',
    },
    {
      prescriptionDate: '2023.07.23',
      hospitalName: '힘내라힘 병원',
      pharmacyName: '다나아 약국',
      favorites: '등록',
    },
    {
      prescriptionDate: '2023.07.23',
      hospitalName: '힘내라힘 병원',
      pharmacyName: '다나아 약국',
      favorites: '등록',
    },
    {
      prescriptionDate: '2023.07.23',
      hospitalName: '힘내라힘 병원',
      pharmacyName: '다나아 약국',
      favorites: '등록',
    },
  ]);

  return (
    <VStack m="0 15px" spacing={'5'} align={'stretch'}>
      <HStack mt={'7'} mb={'-5'} justifyContent={'center'} spacing={'100'}>
        <Box>처방 일시</Box>
        <Box>진료 병원</Box>
        <Box>제조 약국</Box>
        <Box>즐겨찾기</Box>
      </HStack>
      <Divider marginBottom={'-2'} h={'0.5'} bgColor="black" />
      {histories
        .sort(function (a, b) {
          if (a.prescriptionDate > b.prescriptionDate) return 1;
          if (a.prescriptionDate === b.prescriptionDate) return 0;
          if (a.prescriptionDate < b.prescriptionDate) return -1;
        })
        .map((item, index) => (
          <HStack
            h={'55'}
            bg={'primary.100'}
            borderRadius={'10'}
            justifyContent={'center'}
            spacing={'100'}
            key={index}
          >
            <Box>{item.prescriptionDate}</Box>
            <Box>{item.hospitalName}</Box>
            <Box>{item.pharmacyName}</Box>
            <Button colorScheme={'blue'} size={'sm'}>
              {item.favorites}
            </Button>
          </HStack>
        ))}
    </VStack>
  );
};

export default AppointmentHistory;
