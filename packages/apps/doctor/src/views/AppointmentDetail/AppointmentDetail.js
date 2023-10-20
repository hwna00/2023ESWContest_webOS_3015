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
  Modal,
  Text,
  Textarea,
  VStack,
  useDisclosure,
} from '@chakra-ui/react';

import { getAppointment } from '../../api';

const AppointmentDetail = function () {
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

  const onTrmtStartClick = () => {
    navigate('treatment');
  };

  return (
    /* eslint-disable */
    <>
      {isLoading ? (
        <LoadingPage />
      ) : (
        <Box overflow="hidden">
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

          <Grid width="full" templateColumns="1fr 3fr 1fr" gap="8" mt="4">
            <AspectRatio ratio={1} width="40">
              <Avatar src="" alt={data.name} objectFit="cover" />
            </AspectRatio>

            <VStack justifyContent="center" alignItems="flex-start">
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

          <Box mt="6" height="full" overflowY="scroll">
            {data.isNFTF === 1 && <FtfDetail data={data} />}

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
};

export default AppointmentDetail;
