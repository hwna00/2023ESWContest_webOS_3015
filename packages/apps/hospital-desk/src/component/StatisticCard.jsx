import React from 'react';

import { VStack, Text } from '@chakra-ui/react';

// eslint-disable-next-line react/prop-types
function StatisticCard({ title, count }) {
  return (
    <VStack
      h="full"
      w="full"
      minW="40"
      bg="primary.100"
      borderRadius={10}
      padding="4"
      justifyContent="space-between"
    >
      <Text fontSize="2xl" fontWeight="bold">
        {title}
      </Text>
      <Text w="90%" fontSize="5xl" align="right">
        {count}건
      </Text>
    </VStack>
  );
}

export default StatisticCard;
