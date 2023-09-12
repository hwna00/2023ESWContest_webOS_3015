import { useEffect, useState } from 'react';

import { Link as ReactRouterLink } from 'react-router-dom';
import {
  HStack,
  VStack,
  Text,
  Divider,
  Link as ChakraLink,
} from '@chakra-ui/react';

const AppointmentViewList = function ({ type, selectedList }) {
  const [nameOfView, setNameOfView] = useState('');
  useEffect(() => {
    if (type === 'hospital') {
      setNameOfView('병원별 보기');
    } else if (type === 'doctor') {
      setNameOfView('의사별 보기');
    }
  }, [type]);

  return (
    <VStack w="full" h="full">
      <HStack
        w="full"
        justifyContent="space-between"
        alignItems="flex-end"
        pl="2"
        pr="6"
      >
        <Text fontSize="xl" fontWeight="bold">
          {nameOfView}
        </Text>
        <ChakraLink as={ReactRouterLink} to={`/appointment/${type}s`}>
          +더보기
        </ChakraLink>
      </HStack>

      <VStack w="full" h="80" overflowY="auto">
        {selectedList.map(item => (
          <VStack
            w="full"
            alignItems="flex-start"
            px="2"
            key={item.hospitalKey}
          >
            <Divider w="full" h="0.5" bgColor="primary.300" />
            <VStack pl="2" gap="0" alignItems="flex-start">
              <Text>{item.name}</Text>
              <HStack gap="6">
                {item.isOpen ? (
                  <Text fontSize="md" color="primary.400">
                    진료중
                  </Text>
                ) : (
                  <Text fontSize="md" color="red">
                    영업종료
                  </Text>
                )}
                <Text>
                  {item.rating.toFixed(1)}&nbsp;&#40;
                  {item.numberOfRatings}
                  &#41;
                </Text>
              </HStack>
              <HStack my="2" flexWrap="wrap" rowGap="0" columnGap="3">
                {item.specialities.map((speciality, index) => (
                  <Text key={index}>{speciality}</Text>
                ))}
              </HStack>
            </VStack>
            <Divider w="full" h="0.5" bgColor="primary.300" />
          </VStack>
        ))}
      </VStack>
    </VStack>
  );
};

export default AppointmentViewList;
