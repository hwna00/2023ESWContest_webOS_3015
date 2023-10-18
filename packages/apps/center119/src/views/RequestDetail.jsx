import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import {
  AspectRatio,
  Avatar,
  Box,
  Button,
  Grid,
  HStack,
  Heading,
  Text,
  Textarea,
  VStack,
} from '@chakra-ui/react';

import { getRequest, updateRequestState } from '../api';

function RequestDetail() {
  const { id } = useParams();

  const { isLoading, data = {} } = useQuery([`${id}`], () => getRequest(id));
  console.log(data);
  const handleCancelClick = async () => {
    await updateRequestState(id, 'rr', '');
  };

  const handleCompleteClick = async () => {
    await updateRequestState(id, 'rc', null);
  };
  return (
    <>
      {isLoading ? (
        <Text>로딩 중</Text>
      ) : (
        <Box overflow="hidden">
          <HStack justifyContent="space-between" alignItems="center">
            <Heading>{data.name}</Heading>
            <HStack>
              <Button
                colorScheme="red"
                variant="outline"
                onClick={handleCancelClick}
              >
                상담취소
              </Button>
              <Button
                colorScheme="primary"
                variant="outline"
                onClick={handleCompleteClick}
              >
                상담완료
              </Button>
            </HStack>
          </HStack>

          <Grid width="full" templateColumns="1fr 3fr 1fr" gap="8" mt="4">
            <AspectRatio ratio={1}>
              <Avatar src="" alt={data.name} objectFit="cover" />
            </AspectRatio>

            <VStack justifyContent="center" alignItems="flex-start">
              <Text fontSize="lg" fontWeight="bold">
                이름 : {data?.name}
              </Text>
              <Text fontSize="lg" fontWeight="bold">
                전화 번호 : {data?.phoneNumber}
              </Text>
              <Text fontSize="lg" fontWeight="bold">
                생년월일 : {data?.birthDate}
              </Text>
              <Text fontSize="lg" fontWeight="bold">
                주소 : {data?.address}
              </Text>
              <Text fontSize="lg" fontWeight="bold">
                복용약 : {data?.regularMedicines}
              </Text>
              <Text fontSize="lg" fontWeight="bold">
                만성질환 : {data?.chronicDisease}
              </Text>
            </VStack>
          </Grid>

          <Box mt="6" height="full" overflowY="scroll">
            <Box mt="6" height="full">
              <Heading as="h2" fontSize="2xl" fontWeight="bold">
                환자 전달 사항
              </Heading>
              <Textarea
                defaultValue={data?.message}
                height="full"
                mt="4"
                bgColor="primary.100"
                borderRadius="md"
                readOnly
              />
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
}

export default RequestDetail;
