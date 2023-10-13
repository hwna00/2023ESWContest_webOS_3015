import React, { useCallback, useState } from 'react';

import {
  Button,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
import { updatePayment } from '../api';

function PaymentModal({ isOpen, onClose, appointmentId }) {
  const [payment, setPayment] = useState('');

  const handleInputChange = event => {
    setPayment(event.target.value);
  };

  const handleConfirm = useCallback(() => {
    updatePayment(appointmentId, parseInt(payment), '');
    window.location.reload();

    onClose();
  }, [onClose, payment, appointmentId]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered="true">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>금액 입력</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Input
            type="number"
            onChange={handleInputChange}
            placeholder="금액을 입력하세요"
          />
        </ModalBody>
        <ModalFooter>
          <HStack spacing="3">
            <Button colorScheme="red" w="24" onClick={handleConfirm}>
              입력 완료
            </Button>
            <Button mr="3" w="24" onClick={onClose}>
              돌아가기
            </Button>
          </HStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default PaymentModal;
