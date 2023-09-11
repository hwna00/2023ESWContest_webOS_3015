import { Text, VStack, HStack } from '@chakra-ui/react';

const HealthHistoryItem = function ({ measureData }) {
  return (
    <VStack
      h="full"
      w="full"
      minW="40"
      bg="primary.200"
      borderRadius={10}
      padding="4"
      justifyContent="space-between"
    >
      <HStack w="full" justifyContent="space-between">
        <Text fontSize="2xl" fontWeight="bold">
          {measureData.name}
        </Text>
        <Text fontSize="sm" float="right" opacity="0.5">
          {measureData.measuementTime}&gt;
        </Text>
      </HStack>
      <Text w="90%" fontSize="5xl" align="right">
        {measureData.value}
      </Text>
    </VStack>
  );
};

export default HealthHistoryItem;
