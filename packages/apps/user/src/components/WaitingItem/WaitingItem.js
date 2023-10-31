import { useCallback } from 'react';

import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  Box,
  HStack,
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';

import { setTrmt } from '../../store';

function CancelModal({ isOpen, onClose, cancelAppointment }) {
  const handleConfirm = useCallback(
    id => {
      cancelAppointment(id);
      onClose();
    },
    [cancelAppointment, onClose],
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered="true">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>예약 취소</ModalHeader>
        <ModalCloseButton />
        <ModalBody textAlign="center">
          정말로 예약을 취소하시겠습니까?
        </ModalBody>

        <ModalFooter gap="4">
          <Button
            width="20"
            borderColor="primary.300"
            color="primary.300"
            variant="outline"
            onClick={onClose}
          >
            아니요
          </Button>
          <Button width="20" colorScheme="red" onClick={handleConfirm}>
            예
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

const WaitingItem = function ({
  appointment,
  cancelAppointment,
  currAppointmentId,
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleCancel = useCallback(
    id => {
      cancelAppointment(id);
      onClose();
    },
    [cancelAppointment, onClose],
  );

  const onTrmtStart = useCallback(() => {
    dispatch(
      setTrmt({
        uid: appointment.uid,
        appointmentId: appointment.id,
        doctorId: appointment.doctorId,
      }),
    );
    navigate(`/treatment/${appointment.id}`);
  }, [appointment, dispatch, navigate]);

  const getAppointmentState = stateId => {
    switch (stateId) {
      case 'aw':
        return '예약 대기';
      case 'ac':
        return '예약 대기';
      case 'ar':
        return '예약 거절';
      default:
        return '알 수 없음';
    }
  };

  return (
    <HStack
      as="li"
      width="full"
      bg="primary.100"
      py="4"
      borderRadius="10"
      justifyContent="space-between"
    >
      <Box flex={1} textAlign="center">
        {appointment.date} {appointment.time}
      </Box>
      <Box flex={1} textAlign="center">
        {appointment.hospitalName}
      </Box>
      <Box flex={1} textAlign="center">
        {appointment.doctorName}
      </Box>
      <Box flex={1} textAlign="center">
        {getAppointmentState(appointment.stateId)}
      </Box>
      <HStack flex={2} textAlign="center" justifyContent="center" gap="4">
        {appointment.isNFTF && (
          <Button
            colorScheme="primary"
            isDisabled={appointment.id !== Number(currAppointmentId)}
            onClick={onTrmtStart}
          >
            진료실 입장
          </Button>
        )}
        <Button colorScheme="red" variant="outline" onClick={onOpen}>
          예약 취소
        </Button>
      </HStack>
      <CancelModal
        isOpen={isOpen}
        onClose={onClose}
        cancelAppointment={() => handleCancel(appointment.id)}
      />
    </HStack>
  );
};

export default WaitingItem;
