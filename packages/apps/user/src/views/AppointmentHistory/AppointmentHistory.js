import {
  Box,
  Button,
  Divider,
  HStack,
  Link as ChakraLink,
  VStack,
} from '@chakra-ui/react';
import { useState } from 'react';
import { Link as ReactRouterLink } from 'react-router-dom';
import { TiChevronRight } from 'react-icons/ti';
import { BsBookmark } from 'react-icons/bs';

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
      {histories
        .sort(function (a, b) {
          if (a.prescriptionDate > b.prescriptionDate) return 1;
          if (a.prescriptionDate === b.prescriptionDate) return 0;
          if (a.prescriptionDate < b.prescriptionDate) return -1;
        })
        .map((item, index) => (
          <ChakraLink
            key={index}
            as={ReactRouterLink}
            to="/appointment-history/:id"
          >
            <HStack
              bg={'primary.100'}
              py={'3'}
              mb={'1'}
              borderRadius={'10'}
              justifyContent={'center'}
            >
              <Box w={'40'} textAlign={'center'}>
                {item.prescriptionDate}
              </Box>
              <Box w={'40'} textAlign={'center'}>
                {item.hospitalName}
              </Box>
              <Box w={'40'} textAlign={'center'}>
                {item.pharmacyName}
              </Box>
              <Box
                w={'40'}
                mr={'-4'}
                display={'flex'}
                justifyContent={'center'}
              >
                <BsBookmark />
              </Box>
              <TiChevronRight />
            </HStack>
          </ChakraLink>
        ))}
    </VStack>
  );
};

export default AppointmentHistory;
