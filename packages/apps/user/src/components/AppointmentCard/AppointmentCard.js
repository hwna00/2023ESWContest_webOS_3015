import { useState, useCallback } from 'react';

import { GoBookmark, GoBookmarkFill } from 'react-icons/go';
import {
  Box,
  Flex,
  Heading,
  Text,
  Image,
  Icon,
  Button,
  HStack,
} from '@chakra-ui/react';
import { StarIcon } from '@chakra-ui/icons';

function AppointmentCard({ data }) {
  const [isFavorite, setIsFavorite] = useState(data.isFavorite);

  const handleFavoriteClick = useCallback(() => {
    setIsFavorite(prevIsFavorite => !prevIsFavorite);
  }, []);

  return (
    <Box
      key={data.name}
      backgroundColor="primary.300"
      padding="4"
      borderRadius="md"
      width={{ base: 'full', md: 'auto' }}
    >
      <Flex alignItems="center">
        <Image
          src={data.profileImg}
          alt={data.name}
          width="24"
          height="24"
          objectFit="cover"
          borderRadius="full"
          gap="4"
        />
        <Box ml={{ base: '2', md: '4' }} width="60">
          <HStack justifyContent="space-between">
            <Heading as="h3" size="md" mb={1}>
              {data.name}
            </Heading>
            {data.isFavorite && (
              <Button
                onClick={handleFavoriteClick}
                backgroundColor="transparent"
                _hover={{ backgroundColor: 'transparent' }}
                _active={{ backgroundColor: 'transparent' }}
                _focus={{ boxShadow: 'none' }}
              >
                {isFavorite ? (
                  <Icon as={GoBookmarkFill} boxSize="20px" mr="2" />
                ) : (
                  <Icon as={GoBookmark} boxSize="20px" mr="2" />
                )}
              </Button>
            )}
          </HStack>

          <Text fontSize="sm" mb="1">
            {data.specialty && <span>{data.specialty}</span>}
          </Text>
          <Text fontSize="sm" mb="2" noOfLines="1">
            {data.fields.join(', ')}
          </Text>
          <Text fontSize="sm" mb="1">
            {data.distance && <span>{data.distance}</span>}
          </Text>

          <Flex alignItems="center">
            <Icon as={StarIcon} boxSize="4" gap="2" />
            <Text fontSize="sm">{data.rate}</Text>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
}

export default AppointmentCard;
