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
  Radio,
  RadioGroup,
  VStack,
} from '@chakra-ui/react';

// eslint-disable-next-line react/prop-types
function CancelModal({ isOpen, onClose }) {
  const [cancelReason, setCancelReason] = useState('');

  const handleConfirm = useCallback(() => {
    onClose();
  }, [onClose, setCancelReason]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered="true">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>예약을 거절하시겠습니까?</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <RadioGroup onChange={setCancelReason} value={cancelReason}>
            <VStack align="start">
              <Radio value="예약 가능 시간 없음">예약 가능 시간 없음</Radio>
              <Radio value="환자 정보 확인 불가능">환자 정보 확인 불가능</Radio>
              <Radio value="대면 진료 불가능 시간대">
                대면 진료 불가능 시간대
              </Radio>
              <Radio value="비대면 진료 불가능 시간대">
                비대면 진료 불가능 시간대
              </Radio>
              <Radio value="병원 사정">병원 사정</Radio>
              <Radio value="기타">
                <Input placeholder="기타 (거절 사유를 입력해주세요)" />
              </Radio>
            </VStack>
          </RadioGroup>
        </ModalBody>
        <ModalFooter>
          <HStack spacing="3">
            <Button colorScheme="red" w="24" onClick={handleConfirm}>
              거절하기
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

export default CancelModal;
