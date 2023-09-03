import { Box, HStack, Link as ChakraLink } from '@chakra-ui/react';
import { Link as ReactRouterLink } from 'react-router-dom';
import { TiChevronRight } from 'react-icons/ti';
import { BsBookmark } from 'react-icons/bs';

const AppointmentHistoryList = function ({ history }) {
  return (
    <ChakraLink as={ReactRouterLink} to="/appointment-history/1">
      <HStack
        bg={'primary.100'}
        py={'3'}
        mb={'1'}
        borderRadius={'10'}
        justifyContent={'center'}
      >
        <Box w={'40'} textAlign={'center'}>
          {history.prescriptionDate}
        </Box>
        <Box w={'40'} textAlign={'center'}>
          {history.hospitalName}
        </Box>
        <Box w={'40'} textAlign={'center'}>
          {history.pharmacyName}
        </Box>
        <Box w={'40'} mr={'-4'} display={'flex'} justifyContent={'center'}>
          <BsBookmark />
        </Box>
        <TiChevronRight />
      </HStack>
    </ChakraLink>
  );
};

export default AppointmentHistoryList;
