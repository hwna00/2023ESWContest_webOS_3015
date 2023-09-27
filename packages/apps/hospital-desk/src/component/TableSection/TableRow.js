import React, { useCallback } from 'react';

import { useNavigate } from 'react-router-dom';
import { Box, HStack, Button, useDisclosure, Text } from '@chakra-ui/react';

import PaymentModal from '../PaymentModal/PaymentModal';
import CancelModal from '../CancelModal/CancelModal';

function TableRow({ data }) {
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
      <Button h="10" onClick={openPaymentModal}>
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
    <HStack spacing="2" alignItems="center">
      <Button h="10" onClick={moveToDetail} colorScheme="primary">
        상세정보
      </Button>
      {cancelButton}
    </HStack>
  );

  const renderButtons = () => {
    if ('payment' in data) {
      return data.payment ? '결제 완료' : paymentButton;
    }

    if (data.confirm === true) {
      return cancelButton;
    }

    return detailButtons;
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
        {data.name}
      </Box>

      <Box w="20%" textAlign="center">
        {data.phone_number}
      </Box>

      <Box w="20%" textAlign="center">
        {data.date_time}
      </Box>
      <Box w="20%" textAlign="center">
        {data.is_NFTF ? <Text>대면</Text> : <Text>비대면</Text>}
      </Box>
      <Box w="20%" alignContent="center" display="flex" justifyContent="center">
        {renderButtons()}
      </Box>
    </HStack>
  );
}

export default TableRow;
