import { useEffect, useState } from 'react';

import { Link as ReactRouterLink } from 'react-router-dom';
import {
  HStack,
  VStack,
  Text,
  Link as ChakraLink,
  UnorderedList,
  ListItem,
} from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import ListSkeleton from '@housepital/common/ListSkeleton';

import { getAllByCategory } from '../../utils/getByCategory';
import AppointmentCard from '../AppointmentCard/AppointmentCard';

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
        listStyleType="none"
        spacing="4"
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
              <ListItem key={item.id}>
                <ChakraLink
                  as={ReactRouterLink}
                  to={`/appointment/${type}/${item.id}`}
                  width="full"
                >
                  <AppointmentCard data={item} />
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
