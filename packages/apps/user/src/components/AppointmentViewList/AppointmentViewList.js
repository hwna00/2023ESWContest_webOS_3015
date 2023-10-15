import { useEffect, useState } from 'react';

import { Link as ReactRouterLink } from 'react-router-dom';
import {
  HStack,
  VStack,
  Text,
  Link as ChakraLink,
  UnorderedList,
  ListItem,
  AspectRatio,
  Icon,
  Tag,
  Avatar,
} from '@chakra-ui/react';
import { FaStar } from '@react-icons/all-files/fa/FaStar';
import { useQuery } from '@tanstack/react-query';
import ListSkeleton from '@housepital/common/ListSkeleton';

import { getAllByCategory } from '../../utils/getByCategory';
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

const AppointmentViewList = function ({ type }) {
  const [nameOfView, setNameOfView] = useState('');
  const { isLoading, data, isError } = useQuery([type], () =>
    getAllByCategory(type),
  );

  useEffect(() => {
    if (type === 'hospitals') {
      setNameOfView('병원별 보기');
    } else if (type === 'doctors') {
      setNameOfView('의사별 보기');
    }
  }, [type]);

  return (
    <VStack w="full" h="80">
      <HStack
        w="full"
        justifyContent="space-between"
        alignItems="flex-end"
        pl="2"
        pr="6"
      >
        <Text fontSize="xl" fontWeight="bold">
          {nameOfView}
        </Text>
        <ChakraLink as={ReactRouterLink} to={`/appointment/${type}`}>
          +더보기
        </ChakraLink>
      </HStack>

      <UnorderedList
        w="full"
        overflowY="auto"
        listStyleType={'none'}
        spacing={'4'}
        margin={0}
      >
        {isLoading ? (
          <ListSkeleton />
        ) : (
          <>
            {isError && (
              <Text textAlign="center">데이터를 불러올 수 없습니다.</Text>
            )}
            {data?.map(item => (
              <ListItem w="full" px="2" key={item.id}>
                <ChakraLink
                  as={ReactRouterLink}
                  to={`/appointment/${type}/${item.id}`}
                  width={'full'}
                >
                  <HStack
                    justifyContent={'flex-start'}
                    alignItems="flex-start"
                    gap={'6'}
                    padding={'2'}
                    borderY="2px"
                    borderColor={'primary.300'}
                  >
                    <AspectRatio minWidth={'20'} ratio={1}>
                      <Avatar src={item.profileImg} borderRadius={'md'} />
                    </AspectRatio>
                    <VStack pl="2" gap="0" alignItems="flex-start">
                      <HStack gap="4">
                        <Text fontSize="lg" fontWeight="bold">
                          {item.name}
                        </Text>
                        {item.rate && (
                          <HStack gap={'2'}>
                            <Icon as={FaStar} color="yellow.400" />
                            <Text>{Math.round(item.rate * 10) / 10}</Text>
                          </HStack>
                        )}
                      </HStack>

                      <HStack my="2" flexWrap="wrap" noOfLines={2}>
                        {item.fields?.map(field => (
                          <Tag
                            size="md"
                            key={field}
                            variant="outline"
                            colorScheme="gray"
                          >
                            {field}
                          </Tag>
                        ))}
                        <CustomTag ykiho={item.ykiho} />
                      </HStack>
                    </VStack>
                  </HStack>
                </ChakraLink>
              </ListItem>
            ))}
          </>
        )}
      </UnorderedList>
    </VStack>
  );
};

export default AppointmentViewList;
