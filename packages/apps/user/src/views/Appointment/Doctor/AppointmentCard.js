import {
  Box,
  Flex,
  Heading,
  Text,
  Image,
  Icon,
  SimpleGrid,
} from '@chakra-ui/react';
import { StarIcon } from '@chakra-ui/icons';

function AppointmentCard({ doctors }) {
  return (
    <SimpleGrid columns={2} gap="8" mt="4" width={'full'} padding="8">
      {doctors.map(doctor => (
        <Box
          key={doctor.name}
          backgroundColor="primary.300"
          padding="2"
          borderRadius="md"
          width={{ base: 'full', md: 'auto' }}
          marginBottom="4"
        >
          <Flex alignItems="center">
            <Image
              src={doctor.img}
              alt={`${doctor.name} 의사`}
              width="24"
              height="24"
              objectFit="cover"
              borderRadius="full"
            />
            <Box ml={{ base: '2', md: '4' }}>
              <Heading as="h3" size="md" mb="1">
                {doctor.name} 의사
              </Heading>
              <Text fontSize="sm" mb={1}>
                {doctor.specialty}
              </Text>
              <Text fontSize={'sm'} mb={'2'}>
                {doctor.field.join(', ')}
              </Text>
            </Box>
            // rating part is here.
            <Flex alignItems={'center'}>
              <Icon as={StarIcon} boxSize={'4'} mr={'2'} />
              <Text fontSize={'sm'}>{doctor.rate}</Text>
            </Flex>
          </Flex>
        </Box>
      ))}
    </SimpleGrid>
  );
}

export default AppointmentCard;
