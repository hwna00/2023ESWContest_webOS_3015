import { Text, Grid, Flex, VStack, HStack } from '@chakra-ui/react';

const HealthHistory = function () {
  const recentData = [
    { name: '심박수', measuementTime: '17:00', value: 110 },
    { name: '체온', measuementTime: '16:00', value: 90 },
    { name: '수면', measuementTime: '11:00', value: 8 },
    { name: '혈당', measuementTime: '12:00', value: 80 },
    { name: '혈압', measuementTime: '23:00', value: 85 },
    { name: '몸무게', measuementTime: '17:00', value: 60 },
  ];
  return (
    <Flex h={'full '} justifyContent={'center'} alignItems={'center'}>
      <Grid
        w={'85%'}
        templateRows="repeat(2, 1fr)"
        templateColumns="repeat(3, 1fr)"
        gap={6}
        placeItems={'center'}
      >
        {recentData.map((data, index) => (
          <VStack
            h={'full'}
            w={'full'}
            bg={'primary.200'}
            borderRadius={10}
            padding={'4'}
            justifyContent={'space-between'}
          >
            <HStack w={'full'} justifyContent={'space-between'}>
              <Text fontSize="2xl" fontWeight={'bold'}>
                {data.name}
              </Text>
              <Text fontSize="sm" float={'right'} opacity={'0.5'}>
                {data.measuementTime}&gt;
              </Text>
            </HStack>
            <Text w={'90%'} fontSize="5xl" align={'right'}>
              {data.value}
            </Text>
          </VStack>
        ))}
      </Grid>
    </Flex>
  );
};

export default HealthHistory;
