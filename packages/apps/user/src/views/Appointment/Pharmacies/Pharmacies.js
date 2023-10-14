import { useInfiniteQuery } from '@tanstack/react-query';
import { Box, Heading, VStack, Text, Grid } from '@chakra-ui/react';

import { getPharmacies } from '../../../api';
import { useCallback } from 'react';

const Pharmacies = function () {
  const TOTAL_PAGE = 100;

  const { data, isLoading, isError, fetchNextPage } = useInfiniteQuery(
    ['pharmacies'],
    ({ pageParam = 1 }) => getPharmacies({ pageNo: pageParam, numOfRows: 10 }),
    {
      getNextPageParam: lastPage => {
        return lastPage.pageNo !== TOTAL_PAGE ? lastPage.pageNo + 1 : undefined;
      },
    },
  );

  const onScroll = useCallback(
    event => {
      const scrollHeight = event.target.scrollHeight;
      const scrollTop = event.target.scrollTop;
      const offsetHeight = event.target.offsetHeight;
      if (scrollHeight <= scrollTop + offsetHeight) {
        fetchNextPage();
      }
    },
    [fetchNextPage],
  );

  return (
    <VStack width="full" height="full" gap="4">
      <Box width="100%">
        <Heading>약국 선택</Heading>
      </Box>

      <Box width="full" maxHeight="80vh" overflowY="scroll" onScroll={onScroll}>
        <Grid width="full" templateColumns="1fr 1fr" gap="4">
          {isLoading ? (
            'loading...'
          ) : (
            <>
              {isError && (
                <Text textAlign="center">데이터를 불러올 수 없습니다.</Text>
              )}
              {data?.pages.map(page =>
                page.pharmacies.map(pharmacy => (
                  <Box
                    key={pharmacy.ykiho}
                    padding="4"
                    bgColor="primary.100"
                    borderRadius="md"
                  >
                    <Text fontSize="lg" fontWeight="bold">
                      {pharmacy.name}
                    </Text>
                    <Text>주소: {pharmacy.address}</Text>
                    <Text>전화번호: {pharmacy.tel}</Text>
                  </Box>
                )),
              )}
            </>
          )}
        </Grid>
      </Box>
    </VStack>
  );
};

export default Pharmacies;
