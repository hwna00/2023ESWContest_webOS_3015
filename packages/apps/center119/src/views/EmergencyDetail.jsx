import { useNavigate, useParams } from 'react-router-dom';
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
import LoadingPage from '@housepital/common/LoadingPage/LoadingPage';
import VideoCall from './VideoCall';

function EmergencyDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isLoading, data = {} } = useQuery([`${id}`], () => getEmergency(id));

  const handleCompleteClick = async () => {
    // TODO: 상태에 따라 toast 알람 추가하기
    await updateEmergencyState(id, 1);
    navigate('/manage-emergencies');
  };
  return (
    <>
      {isLoading ? (
        <LoadingPage />
      ) : (
        <Box overflow="hidden" height="full" overflowY="scroll">
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

          <Grid width="full" templateColumns="1fr 2fr 2fr" gap="8" my="4">
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

            <Box height="full" overflowY="scroll">
              <Heading as="h2" fontSize="2xl" fontWeight="bold">
                환자 전달 사항
              </Heading>
              <Textarea
                defaultValue={data?.message}
                mt="4"
                bgColor="primary.100"
                borderRadius="md"
                readOnly
              />
            </Box>
          </Grid>
          {data.isCompleted === 0 && <VideoCall patientId={data?.uid} />}
        </Box>
      )}
    </>
  );
}

export default EmergencyDetail;
