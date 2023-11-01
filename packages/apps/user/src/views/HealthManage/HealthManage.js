import { SimpleGrid, VStack } from '@chakra-ui/react';

import HealthHistoryItem from '../../components/HealthHistoryItem/HealthHistoryItem.js';
import { useQuery } from '@tanstack/react-query';
import { getRecentVitalSigns } from '../../api.js';
import { useSelector } from 'react-redux';

const HealthHistory = function () {
  const uid = useSelector(state => state.me.uid);
  const { data: recentData } = useQuery(
    ['vitalSigns'],
    () => getRecentVitalSigns(uid),
    {
      enabled: !!uid,
    },
  );

  return (
    <VStack
      h="full"
      w="full"
      alignContent="center"
      justifyContent={{ base: 'flex-start', sm: 'center' }}
      overflow="auto"
    >
      <SimpleGrid
        w="full"
        spacing="8"
        placeItems="center"
        columns={{ base: 1, sm: 2, md: 3 }}
      >
        {recentData?.map(data => (
          <HealthHistoryItem measureData={data} key={data.id} />
        ))}
      </SimpleGrid>
    </VStack>
  );
};

export default HealthHistory;
