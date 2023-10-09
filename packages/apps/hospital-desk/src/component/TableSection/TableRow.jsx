import React, { useCallback } from 'react';

import { useNavigate } from 'react-router-dom';
import { Box, HStack, Button, useDisclosure, Text } from '@chakra-ui/react';

import PaymentModal from '../PaymentModal';
import CancelModal from '../CancelModal';

function TableRow({ data, buttonType }) {
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
    navigate('/view-appointment/appointment-detail/:id');
  }, [navigate]);

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
        거절하기
      </Button>
      <CancelModal
        isOpen={isCancelOpen}
        onClose={closeCancelModal}
        id={data.id}
      />
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
    if (buttonType === 'payment') {
      return data.payment ? '결제 완료' : paymentButton;
    }

    if (buttonType === 'cancel') {
      return cancelButton;
    }

    if (buttonType === 'detail') {
      return detailButtons;
    }
    if (buttonType === 'detailAndCancel') {
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
      <Box flex={1} textAlign="center">
        {data.name}
      </Box>

      <Box flex={1} textAlign="center">
        {data.phone_number}
      </Box>

      <Box flex={1} textAlign="center">
        {data.date_time}
      </Box>
      <Box flex={1} textAlign="center">
        {data.is_NFTF ? <Text>대면</Text> : <Text>비대면</Text>}
      </Box>
      <Box flex={1} textAlign="center">
        {data.doctorName}
      </Box>
      <Box
        flex={1}
        alignContent="center"
        display="flex"
        justifyContent="center"
      >
        {renderButtons()}
      </Box>
    </HStack>
  );
}

export default TableRow;
