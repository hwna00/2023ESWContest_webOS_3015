import {
  Box,
  HStack,
  ListItem,
  Text,
  UnorderedList,
  VStack,
} from '@chakra-ui/react';
import BackButton from '../../components/BackButton/BackButton';
import ListSkeletion from '@housepital/common/ListSkeleton';
import { useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import { getSideEffectHistory } from '../../api';

const SideEffectHistory = function () {
  const uid = useSelector(state => state.me.uid);
  const { isLoading, data, isError } = useQuery(
    ['sideEffectHistories'],
    () => getSideEffectHistory(uid),
    { enabled: !!uid },
  );

  return (
    <VStack width="full" height="full">
      <HStack width="full">
        <BackButton title="부작용 기록 관리" />
      </HStack>
      <HStack
        width="full"
        justifyContent="space-between"
        fontSize="lg"
        fontWeight="bold"
        mt="8"
      >
        <Box flex={1} textAlign="center" fontWeight="bold">
          증상
        </Box>
        <Box flex={1} textAlign="center" fontWeight="bold">
          결과
        </Box>
        <Box flex={1} textAlign="center" fontWeight="bold">
          의심 약물
        </Box>
      </HStack>

      <UnorderedList
        listStyleType="none"
        width="full"
        h="80vh"
        overflowY="scroll"
        marginX={0}
        mt="4"
        spacing="4"
      >
        {isLoading ? (
          <ListSkeletion />
        ) : (
          <>
            {isError && (
              <Text textAlign="center">데이터를 불러올 수 없습니다.</Text>
            )}
            {data?.map(item => (
              <ListItem
                key={item.id}
                width="full"
                bgColor="primary.100"
                padding="4"
                borderRadius="md"
              >
                <HStack width="full" justifyContent="space-between">
                  <Box flex={1} textAlign="center">
                    {item.expression}
                  </Box>
                  <Box flex={1} textAlign="center">
                    {item.symptom === ''
                      ? '증상을 찾을 수 없습니다.'
                      : item.symptom}
                  </Box>
                  <Box flex={1} textAlign="center">
                    {item.candidatePills.length === 0 &&
                      '매칭되는 약물이 없습니다.'}
                    {item.candidatePills.map(candidate => candidate)}
                  </Box>
                </HStack>
              </ListItem>
            ))}
          </>
        )}
      </UnorderedList>
    </VStack>
  );
};

export default SideEffectHistory;
