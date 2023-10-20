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

import { getEmergency, updateEmergencyState } from '../api';

function EmergencyDetail() {
  const { id } = useParams();

  const { isLoading, data = {} } = useQuery([`${id}`], () => getEmergency(id));

  const handleCompleteClick = async () => {
    await updateEmergencyState(id, 1);
    window.location.reload();
  };
  return (
    <>
      {isLoading ? (
        <Text>로딩 중</Text>
      ) : (
        <Box overflow="hidden">
          <HStack justifyContent="space-between" alignItems="center">
            <Heading>{data.username}</Heading>
            <HStack>
              {data.isCompleted === 0 && (
                <Button
                  colorScheme="primary"
                  variant="outline"
                  onClick={handleCompleteClick}
                >
                  접수완료
                </Button>
              )}
            </HStack>
          </HStack>

          <Grid width="full" templateColumns="1fr 3fr 1fr" gap="8" mt="4">
            <AspectRatio ratio={1}>
              <Avatar src="" alt={data.username} objectFit="cover" />
            </AspectRatio>

            <VStack justifyContent="center" alignItems="flex-start">
              <Text fontSize="lg" fontWeight="bold">
                이름 : {data?.username}
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

export default EmergencyDetail;
