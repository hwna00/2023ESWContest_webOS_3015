import { Link as ReactRouterLink } from 'react-router-dom';
import { HStack, ListItem, Text, Link as ChakraLink } from '@chakra-ui/react';

const AppointmentListItem = function ({ appointment }) {
  return (
    <ListItem cursor="pointer">
      <ChakraLink
        as={ReactRouterLink}
        to={`/appointments/${appointment.id}`}
        textDecoration="none !important"
      >
        <HStack width="full" py="4" bgColor="primary.100" borderRadius="md">
          <Text textAlign="center" flex={1}>
            {appointment.patientName}
          </Text>
          <Text textAlign="center" flex={1}>
            {appointment.date}
          </Text>
          <Text textAlign="center" flex={1}>
            {appointment.time}
          </Text>
          <Text textAlign="center" flex={1}>
            {appointment.isNFTF === 0 ? '대면' : '비대면'}
          </Text>
        </HStack>
      </ChakraLink>
    </ListItem>
  );
};

export default AppointmentListItem;
