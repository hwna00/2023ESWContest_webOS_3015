import { useState } from 'react';

import { Box, Divider, HStack, VStack } from '@chakra-ui/react';

import AppointmentHistoryItem from '../../components/AppointmentHistoryItem/AppointmentHistoryItem';

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
    <VStack mx="5" align="stretch">
      <HStack mt="7" mb="-2" justifyContent="space-evenly">
        <Box width="48" textAlign="center" fontWeight="bold">
          진료 일시
        </Box>
        <Box width="48" textAlign="center" fontWeight="bold">
          진료 병원
        </Box>
        <Box width="48" textAlign="center" fontWeight="bold">
          제조 약국
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
        {histories
          .sort((a, b) => {
            if (a.prescriptionDate > b.prescriptionDate) return 1;
            if (a.prescriptionDate === b.prescriptionDate) return 0;
            if (a.prescriptionDate < b.prescriptionDate) return -1;
          })
          .map((history, index) => (
            <AppointmentHistoryItem key={index} history={history} />
          ))}
      </Box>
    </VStack>
  );
};

export default AppointmentHistory;
