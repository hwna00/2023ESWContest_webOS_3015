import { Box, HStack, Link as ChakraLink } from '@chakra-ui/react';
import { Link as ReactRouterLink } from 'react-router-dom';
import { TiChevronRight } from 'react-icons/ti';

const AppointmentHistoryList = function ({ history }) {
  return (
    <ChakraLink as={ReactRouterLink} to="/appointment-history/1">
      <HStack
        bg={'primary.100'}
        py={'4'}
        borderRadius={'10'}
        justifyContent={'space-evenly'}
      >
        <Box w={'48'} textAlign={'center'}>
          {history.prescriptionDate}
        </Box>
        <Box w={'48'} textAlign={'center'}>
          {history.hospitalName}
        </Box>
        <Box w={'48'} textAlign={'center'}>
          {history.pharmacyName}
        </Box>
        <Box w={'20'} textAlign={'center'}>
          <TiChevronRight />
        </Box>
      </HStack>
    </ChakraLink>
  );
};

export default AppointmentHistoryList;
