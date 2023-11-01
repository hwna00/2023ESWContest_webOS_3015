import { Text, VStack, HStack } from '@chakra-ui/react';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

const HealthHistoryItem = function ({ measureData }) {
  const navigate = useNavigate();

  const onClick = useCallback(() => {
    navigate(measureData.type);
  }, [navigate, measureData]);

  return (
    <VStack
      h="full"
      w="full"
      minW="40"
      bg="primary.200"
      borderRadius={10}
      padding="4"
      justifyContent="space-between"
      onClick={onClick}
    >
      <HStack w="full" justifyContent="space-between">
        <Text fontSize="2xl" fontWeight="bold">
          {measureData.name}
        </Text>
        <Text fontSize="sm" float="right" opacity="0.5">
          {measureData.time}&gt;
        </Text>
      </HStack>
      <Text fontSize="xl" align="right">
        {measureData.value ? measureData.value : '기록이 존재하지 않습니다.'}
      </Text>
    </VStack>
  );
};

export default HealthHistoryItem;
