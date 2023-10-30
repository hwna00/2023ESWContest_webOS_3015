import { Link as ReactRouterLink } from 'react-router-dom';
import { FaAngleRight } from '@react-icons/all-files/fa/FaAngleRight';
import {
  HStack,
  Text,
  ListItem,
  Icon,
  Link as ChakraLink,
} from '@chakra-ui/react';

const AppointmentHistoryItem = function ({ diagnosis }) {
  return (
    <ListItem>
      <ChakraLink
        as={ReactRouterLink}
        to={`/appointment-history/${diagnosis.id}`}
        textDecoration="none !important"
      >
        <HStack
          bg="primary.100"
          py="4"
          borderRadius="10"
          justifyContent="space-between"
        >
          <Text flex={1} textAlign="center">
            {diagnosis.date}
          </Text>
          <Text flex={1} textAlign="center">
            {diagnosis.hospitalName}
          </Text>
          <Text flex={1} textAlign="center">
            {diagnosis.payment}
          </Text>
          <Text flex={1} textAlign="center">
            <Icon as={FaAngleRight} boxSize={6} />
          </Text>
        </HStack>
      </ChakraLink>
    </ListItem>
  );
};

export default AppointmentHistoryItem;
