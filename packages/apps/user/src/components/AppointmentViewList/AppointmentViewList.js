import { Link as ReactRouterLink } from 'react-router-dom';
import {
  HStack,
  VStack,
  Text,
  Divider,
  Link as ChakraLink,
} from '@chakra-ui/react';

const AppointmentViewList = function ({ type, information }) {
  const nameOfView = type === 'hospital' ? '병원별 보기' : '의사별 보기';

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
        {information.map(info => (
          <VStack
            w="full"
            alignItems="flex-start"
            px="2"
            key={info.hospitalKey}
          >
            <Divider w="full" h="0.5" bgColor="primary.300" />
            <VStack pl="2" gap="0" alignItems="flex-start">
              <Text>{info.name}</Text>
              <HStack gap="6">
                {info.isOpen ? (
                  <Text fontSize="md" color="primary.400">
                    진료중
                  </Text>
                ) : (
                  <Text fontSize="md" color="red">
                    영업종료
                  </Text>
                )}
                <Text>
                  {info.rating.toFixed(1)}&nbsp;&#40;
                  {info.numberOfRatings}
                  &#41;
                </Text>
              </HStack>
              <HStack my="2" flexWrap="wrap" rowGap="0" columnGap="3">
                {info.specialities.map((speciality, index) => (
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
