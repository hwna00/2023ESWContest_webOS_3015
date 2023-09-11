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
  AspectRatio,
} from '@chakra-ui/react';
import { StarIcon } from '@chakra-ui/icons';

function AppointmentCard({ data }) {
  const [isFavorite, setIsFavorite] = useState(data.isFavorite);

  const handleFavoriteClick = useCallback(() => {
    setIsFavorite(prevIsFavorite => !prevIsFavorite);
  }, []);

  return (
    <Flex
      key={data.name}
      backgroundColor="primary.200"
      padding="4"
      borderRadius="md"
      alignItems="center"
      gap="6"
    >
      <AspectRatio ratio={1} width={'100%'} maxW={'32'}>
        <Image
          src={data.profileImg}
          alt={data.name}
          objectFit="cover"
          borderRadius="full"
        />
      </AspectRatio>

      <Box width="100%">
        <HStack justifyContent="space-between">
          <Heading as="h3" size="md" mb={1}>
            {data.name}
          </Heading>
          {data.isFavorite && (
            <>
              {isFavorite ? (
                <Icon
                  as={GoBookmarkFill}
                  onClick={handleFavoriteClick}
                  boxSize="25px"
                  mr="2"
                  mb="1"
                />
              ) : (
                <Icon
                  as={GoBookmark}
                  onClick={handleFavoriteClick}
                  boxSize="25px"
                  mr="2"
                  mb="1"
                />
              )}
            </>
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

        <Flex alignItems="center" gap="2">
          <Icon as={StarIcon} boxSize="4" />
          <Text fontSize="sm">{data.rate}</Text>
        </Flex>
      </Box>
    </Flex>
  );
}

export default AppointmentCard;
