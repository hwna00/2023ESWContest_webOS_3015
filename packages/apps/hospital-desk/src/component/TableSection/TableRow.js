import React, { useCallback } from 'react';

import { useNavigate } from 'react-router-dom';
import { Box, HStack, Button, useDisclosure } from '@chakra-ui/react';

import PaymentModal from '../PaymentModal/PaymentModal';
import CancelModal from '../CancelModal/CancelModal';

function TableRow({ data, first, second, third, fourth, fifth }) {
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

  const moveToDetail = useCallback(() => {
    navigate('/detail');
  }, []);

  const paymentButton = (
    <>
      <Button h="10" colorScheme="primary" onClick={openPaymentModal}>
        금액 입력
      </Button>
      <PaymentModal isOpen={isPaymentOpen} onClose={closePaymentModal} />
    </>
  );

  const cancelButton = (
    <>
      <Button h="10" onClick={openCancelModal} colorScheme="red">
        취소하기
      </Button>
      <CancelModal isOpen={isCancelOpen} onClose={closeCancelModal} />
    </>
  );

  const detailButtons = (
    <Button h="10" onClick={moveToDetail} colorScheme="primary">
      상세정보
    </Button>
  );

  const detailAndCancelButtons = (
    <HStack spacing="2" alignItems="center">
      <Button h="10" onClick={moveToDetail} colorScheme="primary">
        상세정보
      </Button>
      {cancelButton}
    </HStack>
  );
  const renderButtons = () => {
    if (fifth === 'payment') {
      return data.payment ? '결제 완료' : paymentButton;
    }

    if (fifth === 'cancel') {
      return cancelButton;
    }

    if (fifth === 'detail') {
      return detailButtons;
    }
    if (fifth === 'detailAndCancel') {
      return detailAndCancelButtons;
    }

    return null;
  };
  return (
    <HStack
      bg="primary.100"
      py="4"
      mb="2"
      borderRadius="10"
      justifyContent="space-evenly"
      h="14"
    >
      <Box w="20%" textAlign="center">
        {first}
      </Box>

      <Box w="20%" textAlign="center">
        {second}
      </Box>

      <Box w="20%" textAlign="center">
        {third}
      </Box>
      <Box w="20%" textAlign="center">
        {fourth}
      </Box>
      <Box w="20%" alignContent="center" display="flex" justifyContent="center">
        {renderButtons()}
      </Box>
    </HStack>
  );
}

export default TableRow;
