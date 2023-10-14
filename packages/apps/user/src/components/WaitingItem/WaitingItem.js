import { useCallback } from 'react';

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

const WaitingItem = function ({ appointment, cancelAppointment }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleCancel = useCallback(
    id => {
      cancelAppointment(id);
      onClose();
    },
    [cancelAppointment, onClose],
  );
  return (
    <HStack
      as="li"
      width="full"
      bg="primary.100"
      py="4"
      borderRadius="10"
      justifyContent="space-evenly"
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
      <Box flex={1} textAlign="center" alignContent="center">
        <Button colorScheme="red" variant="outline" onClick={onOpen}>
          취소하기
        </Button>
      </Box>
      <CancelModal
        isOpen={isOpen}
        onClose={onClose}
        cancelAppointment={() => handleCancel(appointment.id)}
      />
    </HStack>
  );
};

export default WaitingItem;
