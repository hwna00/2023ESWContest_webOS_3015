import { useState, useCallback } from 'react';

import { FaRegBookmark } from '@react-icons/all-files/fa/FaRegBookmark';
import { FaBookmark } from '@react-icons/all-files/fa/FaBookmark';
import {
  Box,
  Flex,
  Text,
  Icon,
  HStack,
  AspectRatio,
  Avatar,
  Tag,
} from '@chakra-ui/react';
import { StarIcon } from '@chakra-ui/icons';
import { useQuery } from '@tanstack/react-query';
import { getFields } from '../../api';

const CustomTag = function ({ ykiho }) {
  const { data: fields = [] } = useQuery(['fields', ykiho], getFields, {
    enabled: !!ykiho,
  });

  return fields?.map(field => (
    <Tag size="md" key={field.dgsbjtCdNm} variant="outline" colorScheme="gray">
      {field.dgsbjtCdNm}
    </Tag>
  ));
};

function AppointmentCard({ data }) {
  const [isFavorite, setIsFavorite] = useState(data.isFavorite);

  const handleFavoriteClick = useCallback(() => {
    setIsFavorite(prevIsFavorite => !prevIsFavorite);
  }, []);

  return (
    <Flex
      key={data.id}
      bgColor="primary.100"
      padding="4"
      borderRadius="md"
      alignItems="flex-start"
      gap="6"
    >
      <AspectRatio ratio={1} minWidth="24">
        <Avatar src={data.profileImg} alt={data.name} />
      </AspectRatio>

      <Box width="100%">
        <HStack justifyContent="space-between">
          <HStack gap="4">
            <Text fontSize="lg" fontWeight="bold">
              {data.name}
            </Text>
            {data.rate && (
              <HStack gap={'2'}>
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
        <HStack flexWrap="wrap" gap="2" noOfLines={2}>
          {data.fields?.map(field => (
            <Tag size="md" key={field} variant="outline" colorScheme="gray">
              {field}
            </Tag>
          ))}
          <CustomTag ykiho={data.ykiho} />
        </HStack>
      </Box>
    </Flex>
  );
}

export default AppointmentCard;
