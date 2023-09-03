import { Box, Flex, Heading, Text, Image, Icon } from '@chakra-ui/react';
import { StarIcon } from '@chakra-ui/icons';

function AppointmentCard({ info }) {
  return (
    <Box
      key={info.name}
      backgroundColor="primary.300"
      padding="2"
      borderRadius="md"
      width={{ base: 'full', md: 'auto' }}
      marginBottom="4"
    >
      <Flex alignItems="center">
        <Image
          src={info.img}
          alt={`${info.name}`}
          width="24"
          height="24"
          objectFit="cover"
          borderRadius="full"
        />
        <Box ml={{ base: '2', md: '4' }}>
          <Heading as="h3" size="md" mb="1">
            {info.name}
          </Heading>
          <Text fontSize="sm" mb={1}>
            {info.specialty && <span>{info.specialty}</span>}
          </Text>
          <Text fontSize={'sm'} mb={'2'}>
            {info.field.join(', ')}
          </Text>
          <Text fontSize="sm" mb="1">
            {info.distance && <span>{info.distance}</span>}
          </Text>
          <Flex alignItems={'center'}>
            <Icon as={StarIcon} boxSize={'4'} mr={'2'} />
            <Text fontSize={'sm'}>{info.rate}</Text>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
}

export default AppointmentCard;
