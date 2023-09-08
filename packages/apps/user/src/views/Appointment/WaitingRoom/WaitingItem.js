import { Box, HStack, Button } from '@chakra-ui/react';

const WaitingItem = function ({ waiting, cancelAppointment, index }) {
  return (
    <HStack
      bg={'primary.100'}
      py={'4'}
      borderRadius={'10'}
      justifyContent={'space-evenly'}
    >
      <Box w={'44'} textAlign={'center'}>
        {waiting.date}
      </Box>
      <Box w={'44'} textAlign={'center'}>
        {waiting.hospital}
      </Box>
      <Box w={'44'} textAlign={'center'}>
        {waiting.name}
      </Box>
      <Box w={'16'} textAlign={'center'}>
        <Button onClick={() => cancelAppointment(index)}>취소하기</Button>
      </Box>
    </HStack>
  );
};

export default WaitingItem;
