import { Link as ReactRouterLink } from 'react-router-dom';
import { Box, Flex, HStack, VStack, Text, Image , Link as ChakraLink } from '@chakra-ui/react';

import AppointmentViewList from '../../components/AppointmentViewList/AppointmentViewList';

const favorites = [
  {
    hospitalKey: 0,
    src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsJdMaCS7uZhDHByTc7LbdzAEksv2Cpk4Vc3wWDHDaG5std77hpHokQQm-zcDHBIqMGYk&usqp=CAU',
  },
  {
    hospitalKey: 1,
    src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsJdMaCS7uZhDHByTc7LbdzAEksv2Cpk4Vc3wWDHDaG5std77hpHokQQm-zcDHBIqMGYk&usqp=CAU',
  },
  {
    hospitalKey: 2,
    src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsJdMaCS7uZhDHByTc7LbdzAEksv2Cpk4Vc3wWDHDaG5std77hpHokQQm-zcDHBIqMGYk&usqp=CAU',
  },
  {
    hospitalKey: 3,
    src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsJdMaCS7uZhDHByTc7LbdzAEksv2Cpk4Vc3wWDHDaG5std77hpHokQQm-zcDHBIqMGYk&usqp=CAU',
  },
  {
    hospitalKey: 4,
    src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsJdMaCS7uZhDHByTc7LbdzAEksv2Cpk4Vc3wWDHDaG5std77hpHokQQm-zcDHBIqMGYk&usqp=CAU',
  },
  {
    hospitalKey: 5,
    src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsJdMaCS7uZhDHByTc7LbdzAEksv2Cpk4Vc3wWDHDaG5std77hpHokQQm-zcDHBIqMGYk&usqp=CAU',
  },
];

const hospitalInfo = [
  {
    hospitalKey: 0,
    name: '지웅병원',
    isOpen: true,
    rating: 5.0,
    numberOfRatings: 30,
    specialities: ['이비인후과', '성형외과'],
  },
  {
    hospitalKey: 1,
    name: '철환병원',
    isOpen: false,
    rating: 4.3,
    numberOfRatings: 2,
    specialities: ['이비인후과'],
  },
  {
    hospitalKey: 2,
    name: '진형병원',
    isOpen: true,
    rating: 3.0,
    numberOfRatings: 3,
    specialities: ['피부과', '소아과'],
  },
  {
    hospitalKey: 3,
    name: '재인병원',
    isOpen: false,
    rating: 1.0,
    numberOfRatings: 10,
    specialities: ['마취과', '심장병학과'],
  },
  {
    hospitalKey: 4,
    name: '보경병원',
    isOpen: false,
    rating: 0.5,
    numberOfRatings: 20,
    specialities: [
      '마취과',
      '심장병학과',
      '피부과',
      '응급의학과',
      '내분비학과',
      '소화기내과',
      '일반진료과',
    ],
  },
];

const doctorInfo = [
  {
    hospitalKey: 0,
    name: '양지웅',
    isOpen: true,
    rating: 5.0,
    numberOfRatings: 30,
    specialities: ['이비인후과', '성형외과'],
  },
  {
    hospitalKey: 1,
    name: '하철환',
    isOpen: false,
    rating: 4.3,
    numberOfRatings: 2,
    specialities: ['이비인후과'],
  },
];

const Appointment = function () {
  return (
    <VStack w="full" h="full">
        <HStack w="full" gap="6" px="2">
          <Box
            bg="primary.200"
            w="full"
            h="40"
            borderRadius="10"
            p="4"
          >
            <Box>
              <Text fontSize="2xl" fontWeight="bold" h="25%">
                진행 현황
              </Text>
            </Box>
            <Flex h="75%" alignItems="center" justifyContent="center">
              <Text opacity="0.5">예약 내역이 없습니다.</Text>
            </Flex>
          </Box>

          <VStack
            bg="primary.200"
            w="full"
            h="40"
            borderRadius="10"
            p="4"
          >
            <HStack
              w="full"
              justifyContent="space-between"
              alignItems="flex-end"
            >
              <Text fontSize="2xl" fontWeight="bold">
                즐겨찾기
              </Text>
              <ChakraLink as={ReactRouterLink} to="/appointment/favorites">
                + 더보기
              </ChakraLink>
            </HStack>

            <HStack justifyContent="flex-start" overflowX="scroll">
              {favorites.map(favorite => (
                <Image
                  key={favorite.hospitalKey}
                  src={favorite.src}
                  h="full"
                />
              ))}
            </HStack>
          </VStack>
        </HStack>

        <HStack w="full" mt="4">
          <AppointmentViewList type="hospital" information={hospitalInfo} />
          <AppointmentViewList type="doctor" information={doctorInfo} />
        </HStack>
      </VStack>
  );
};

export default Appointment;
