import { SimpleGrid, VStack } from '@chakra-ui/react';

import HealthHistoryItem from '../../components/HealthHistoryItem/HealthHistoryItem.js';

const HealthHistory = function () {
  // TODO: 각 항목별 최근 기록을 가져오는 api 필요
  // TODO: 각 항목별 상세 기록 가져오는 api 필요
  // TODO: 각 항목별 기록을 저장하는 api 필요
  const recentData = [
    { id: 0, name: '심박수', type: 'bpm', measuementTime: '17:00', value: 110 },
    {
      id: 1,
      name: '체온',
      type: 'temperature',
      measuementTime: '16:00',
      value: 90,
    },
    { id: 2, name: '수면', type: 'sleep', measuementTime: '11:00', value: 8 },
    { id: 3, name: '혈당', type: '', measuementTime: '12:00', value: 80 },
    {
      id: 4,
      name: '혈압',
      type: 'bloodPressure',
      measuementTime: '23:00',
      value: 85,
    },
    {
      id: 5,
      name: '몸무게',
      type: 'weight',
      measuementTime: '17:00',
      value: 60,
    },
  ];

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
        {recentData.map(data => (
          <HealthHistoryItem measureData={data} key={data.id} />
        ))}
      </SimpleGrid>
    </VStack>
  );
};

export default HealthHistory;
