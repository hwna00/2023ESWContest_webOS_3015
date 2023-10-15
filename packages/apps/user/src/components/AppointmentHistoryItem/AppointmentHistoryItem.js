import { Link as ReactRouterLink } from 'react-router-dom';
import { TiChevronRight } from '@react-icons/all-files/ti/TiChevronRight';
import {
  HStack,
  Link as ChakraLink,
  Text,
  ListItem,
  Icon,
} from '@chakra-ui/react';

const AppointmentHistoryItem = function ({ diagnosis }) {
  console.log(diagnosis);
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
            <Icon as={TiChevronRight} />
          </Text>
        </HStack>
      </ChakraLink>
    </ListItem>
  );
};

export default AppointmentHistoryItem;
