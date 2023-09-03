import { Box, Divider, HStack, VStack } from '@chakra-ui/react';
import AppointmentHistoryList from '../../components/AppointmentHistoryList/AppointmentHistoryList';
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
    {
      prescriptionDate: '2023.07.23',
      hospitalName: '힘내라힘 병원',
      pharmacyName: '다나아 약국',
      favorites: '등록',
    },
  ]);

  return (
    <VStack ml={'5'} mr={'5'} align={'stretch'}>
      <HStack mt={'7'} mb={'-2'} justifyContent={'center'}>
        <Box w={'40'} textAlign={'center'}>
          처방 일시
        </Box>
        <Box w={'40'} textAlign={'center'}>
          진료 병원
        </Box>
        <Box w={'40'} textAlign={'center'}>
          제조 약국
        </Box>
        <Box w={'40'} textAlign={'center'}>
          즐겨찾기
        </Box>
      </HStack>
      <Divider h={'0.5'} mb={'1'} bgColor="black" />
      <Box
        display={'flex'}
        flexDirection={'column'}
        gap={'3'}
        h={'470'}
        overflowY={'scroll'}
      >
        {histories
          .sort(function (a, b) {
            if (a.prescriptionDate > b.prescriptionDate) return 1;
            if (a.prescriptionDate === b.prescriptionDate) return 0;
            if (a.prescriptionDate < b.prescriptionDate) return -1;
          })
          .map((history, index) => (
            <AppointmentHistoryList key={index} history={history} />
          ))}
      </Box>
    </VStack>
  );
};

export default AppointmentHistory;
