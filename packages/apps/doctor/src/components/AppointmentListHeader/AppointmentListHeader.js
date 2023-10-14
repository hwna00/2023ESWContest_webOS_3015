import { HStack, Text } from '@chakra-ui/react';

const AppointmentListHeader = function () {
  return (
    <HStack width="full" fontSize="lg" fontWeight="bold">
      <Text flex={1} textAlign="center" py="4">
        이름
      </Text>
      <Text flex={1} textAlign="center" py="4">
        전화번호
      </Text>
      <Text flex={1} textAlign="center" py="4">
        예약일자
      </Text>
      <Text flex={1} textAlign="center" py="4">
        예약시간
      </Text>
      <Text flex={1} textAlign="center" py="4">
        타입
      </Text>
    </HStack>
  );
};

export default AppointmentListHeader;
