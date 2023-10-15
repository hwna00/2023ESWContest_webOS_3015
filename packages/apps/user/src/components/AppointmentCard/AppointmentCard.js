import { useState, useCallback } from 'react';

import { FaRegBookmark } from '@react-icons/all-files/fa/FaRegBookmark';
import { FaBookmark } from '@react-icons/all-files/fa/FaBookmark';
import {
  Text,
  Icon,
  HStack,
  AspectRatio,
  Avatar,
  Tag,
  VStack,
} from '@chakra-ui/react';
import { StarIcon } from '@chakra-ui/icons';

import FieldList from '../FieldList';

function AppointmentCard({ data }) {
  const [isFavorite, setIsFavorite] = useState(data?.isFavorite);

  const handleFavoriteClick = useCallback(() => {
    setIsFavorite(prevIsFavorite => !prevIsFavorite);
  }, []);

  return (
    <HStack
      key={data.id}
      bgColor="primary.100"
      padding="4"
      borderRadius="md"
      justifyContent="flex-start"
      alignItems="center"
      gap="6"
    >
      <AspectRatio ratio={1} minWidth="24">
        <Avatar src={data?.profileImg} alt={data.name} />
      </AspectRatio>

      <VStack alignItems="flex-start" justifyContent="flex-start" gap={0}>
        <HStack justifyContent="space-between">
          <HStack gap="4" fontWeight="bold">
            <Text fontSize="lg">{data.name}</Text>
            {data.rate && (
              <HStack gap="1">
                <Icon as={StarIcon} color="yellow.400" />
                <Text>{Math.round(data.rate * 10) / 10}</Text>
              </HStack>
            )}
          </HStack>
          {data.isFavorite && (
            <>
              {isFavorite ? (
                <Icon
                  as={FaBookmark}
                  onClick={handleFavoriteClick}
                  boxSize="25px"
                  mr="2"
                  mb="1"
                />
              ) : (
                <Icon
                  as={FaRegBookmark}
                  onClick={handleFavoriteClick}
                  boxSize="25px"
                  mr="2"
                  mb="1"
                />
              )}
            </>
          )}
        </HStack>

        <Text fontSize="sm">
          {data.specialty && <span>{data.specialty} 전문의</span>}
        </Text>

        <HStack flexWrap="wrap" gap="2" noOfLines={2} mt="4">
          {data.fields ? (
            JSON.parse(data.fields).map(field => (
              <Tag size="md" key={field} variant="outline" colorScheme="gray">
                {field}
              </Tag>
            ))
          ) : (
            <FieldList ykiho={data.ykiho} />
          )}
        </HStack>
      </VStack>
    </HStack>
  );
}

export default AppointmentCard;
