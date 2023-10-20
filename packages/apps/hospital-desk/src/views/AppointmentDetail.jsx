import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import LoadingPage from '@housepital/common/LoadingPage';
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

import FtfDetail from '@housepital/common/FtfDetail/FtfDetail';
import { getPatientDetail, updateAppointmentState } from '../api';
import PaymentModal from '../component/PaymentModal';
import { useCallback } from 'react';
import CancelModal from '../component/CancelModal';

const AppointmentDetail = function () {
  const { id } = useParams();
  const AppointmentId = id;
  const navigate = useNavigate();
  const {
    isOpen: isCancelOpen,
    onOpen: openCancelModal,
    onClose: closeCancelModal,
  } = useDisclosure();

  const {
    isOpen: isPaymentOpen,
    onOpen: openPaymentModal,
    onClose: closePaymentModal,
  } = useDisclosure();

  const { data, isLoading } = useQuery([AppointmentId], getPatientDetail);

  const handleConfirm = useCallback(() => {
    updateAppointmentState(AppointmentId, 'ac', '')
      .then(() => {
        window.location.reload();
      })
      .catch(() => {
        navigate('/error-page');
      });
  }, [AppointmentId, navigate]);

  return (
    <>
      {isLoading ? (
        <LoadingPage />
      ) : (
        <Box overflow="hidden">
          <HStack justifyContent="space-between" alignItems="center">
            <Heading>{data.name} 환자</Heading>
            {data.stateId === 'aw' ? (
              <Button colorScheme="primary" onClick={handleConfirm}>
                예약수락
              </Button>
            ) : data.stateId === 'dc' ? (
              <>
                <Button h="10" colorScheme="primary" onClick={openPaymentModal}>
                  금액 입력
                </Button>
                <PaymentModal
                  isOpen={isPaymentOpen}
                  onClose={closePaymentModal}
                  appointmentId={data.id}
                />
              </>
            ) : data.stateId === 'pc' ? null : (
              <>
                <Button colorScheme="red" onClick={openCancelModal}>
                  취소하기
                </Button>
                <CancelModal isOpen={isCancelOpen} onClose={closeCancelModal} />
              </>
            )}
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
