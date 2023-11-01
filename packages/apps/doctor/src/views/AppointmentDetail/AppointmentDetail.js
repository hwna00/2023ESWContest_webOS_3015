import { useEffect, useRef } from 'react';

import { io } from 'socket.io-client';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import LoadingPage from '@housepital/common/LoadingPage';
import FtfDetail from '@housepital/common/FtfDetail/FtfDetail';
import {
  AspectRatio,
  Avatar,
  Box,
  Button,
  Grid,
  HStack,
  Heading,
  ListItem,
  Modal,
  Tag,
  Text,
  Textarea,
  UnorderedList,
  VStack,
  useDisclosure,
} from '@chakra-ui/react';

import {
  getAppointment,
  getPatient,
  getPatientSideEffectHistory,
} from '../../api';

const roomName = 'myRoom';

const AppointmentDetail = function () {
  const socketRef = useRef();
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    isOpen: isCancelOpen,
    onOpen: openCancelModal,
    onClose: closeCancelModal,
  } = useDisclosure();

  const { isLoading, data = {} } = useQuery([`${id}`], () =>
    getAppointment(id),
  );

  const { data: sideEffectHistories } = useQuery(
    ['sideEffectHistories'],
    () => getPatientSideEffectHistory(data.uid),
    {
      enabled: !!data,
    },
  );

  const { data: patient } = useQuery(['patient'], () => getPatient(data.uid), {
    enabled: !!data,
  });
  console.log(patient);

  const onTrmtStartClick = async () => {
    await socketRef.current.emit('trmt_start', roomName, id);
    navigate('treatment');
  };

  useEffect(() => {
    socketRef.current = io(`${process.env.REACT_APP_BACKEND_API}`);

    socketRef.current.emit('join_room', roomName);
  });

  return (
    /* eslint-disable */
    <>
      {isLoading ? (
        <LoadingPage />
      ) : (
        <Box height="full" overflowY="scroll">
          <HStack justifyContent="space-between" alignItems="center">
            <Heading>{data.name} 환자</Heading>
            <Button
              colorScheme="red"
              variant="outline"
              onClick={openCancelModal}
            >
              예약 취소
            </Button>
          </HStack>

          <Grid width="full" templateColumns="1fr 2fr 2fr 1fr" gap="8" mt="4">
            <AspectRatio ratio={1} width="40">
              <Avatar
                // src={getBlob(`${data.uid}/profile.png`)}
                src=""
                alt={data.name}
                objectFit="cover"
              />
            </AspectRatio>

            <VStack justifyContent="flex-start" alignItems="flex-start">
              <Text fontSize="lg" fontWeight="bold">
                진료 타입 : {data.isNFTF === 0 ? '대면' : '비대면'}
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
            </VStack>

            <VStack justifyContent="flex-start" alignItems="flex-start">
              <Text fontSize="lg" fontWeight="bold">
                성별 : {patient?.gender === 'M' ? '남성' : '여성'}
              </Text>
              <Text fontSize="lg" fontWeight="bold">
                혈액형 : {data?.bloodType}형
              </Text>
              <Text fontSize="lg" fontWeight="bold">
                키 : {data?.height ? data?.height + 'cm' : '기록 없음'}
              </Text>
              <Text fontSize="lg" fontWeight="bold">
                몸무게 : {data?.weight ? data?.weight + 'kg' : '기록 없음'}
              </Text>
            </VStack>

            {data.isNFTF === 1 && (
              <Button
                alignSelf="center"
                colorScheme="primary"
                onClick={onTrmtStartClick}
              >
                진료 시작
              </Button>
            )}
            <Modal isOpen={isCancelOpen} onClose={closeCancelModal}>
              hi
            </Modal>
          </Grid>

          <Box mt="6">{data.isNFTF === 1 && <FtfDetail data={data} />}</Box>

          <HStack mt="6" width="full" justifyContent="center" gap="4">
            <Box flex={1} height="40" overflowY="scroll">
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

            <Box flex={1} height="40" overflowY="scroll">
              <Heading as="h2" fontSize="2xl" fontWeight="bold">
                환자 특이사항
              </Heading>
              <Box>
                <Textarea
                  defaultValue={
                    patient?.chronicDisease + '\n' + patient?.regularMedicines
                  }
                  mt="4"
                  bgColor="primary.100"
                  borderRadius="md"
                  readOnly
                />
              </Box>
            </Box>
          </HStack>

          <Box mt="6" height="80" overflowY="scroll">
            <Heading as="h2" fontSize="2xl" fontWeight="bold">
              환자 부작용 목록
            </Heading>
            <UnorderedList
              listStyleType="none"
              width="full"
              overflowY="scroll"
              marginX={0}
              mt="4"
              spacing="4"
            >
              {sideEffectHistories?.length === 0 && (
                <Text>부작용 정보가 없습니다.</Text>
              )}
              {sideEffectHistories?.map(item => (
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
                      <HStack
                        justifyContent="center"
                        alignItems="center"
                        flexWrap="nowrap"
                      >
                        {item.candidatePills.map(candidate => (
                          <Tag colorScheme="gray" padding="2" variant="outline">
                            {candidate.medicineName}
                          </Tag>
                        ))}
                      </HStack>
                    </Box>
                  </HStack>
                </ListItem>
              ))}
            </UnorderedList>
          </Box>
        </Box>
      )}
    </>
  );
};

export default AppointmentDetail;
