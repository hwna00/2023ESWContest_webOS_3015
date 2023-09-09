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
  const handleConfirm = useCallback(() => {
    cancelAppointment();
    onClose();
  }, [cancelAppointment, onClose]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered="true">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>예약 취소</ModalHeader>
        <ModalCloseButton />
        <ModalBody>정말로 예약을 취소하시겠습니까?</ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr="3" width="12" onClick={onClose}>
            아니요
          </Button>
          <Button colorScheme="red" width="12" onClick={handleConfirm}>
            예
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

const WaitingItem = function ({ waiting, cancelAppointment, index }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleCancel = useCallback(() => {
    cancelAppointment(index);
    onClose();
  }, [cancelAppointment, index, onClose]);
  return (
    <HStack
      bg={'primary.100'}
      py={'4'}
      borderRadius={'10'}
      justifyContent={'space-evenly'}
    >
      <Box w={'25%'} textAlign={'center'}>
        {waiting.date}
      </Box>
      <Box w={'25%'} textAlign={'center'}>
        {waiting.hospital}
      </Box>
      <Box w={'25%'} textAlign={'center'}>
        {waiting.name}
      </Box>
      <Box w={'25%'} textAlign={'center'} alignContent={'center'}>
        <Button onClick={onOpen}>취소하기</Button>

        <CancelModal
          isOpen={isOpen}
          onClose={onClose}
          cancelAppointment={handleCancel}
        />
      </Box>
    </HStack>
  );
};

export default WaitingItem;
