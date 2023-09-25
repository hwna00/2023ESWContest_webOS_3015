/* eslint-disable react/prop-types */
import React from 'react';

import { Box, HStack, Button, useDisclosure } from '@chakra-ui/react';

import PaymentModal from '../PaymentModal/PaymentModal';
import CancelModal from '../CancelModal/CancelModal';

// eslint-disable-next-line react/prop-types
function TableRow({ data }) {
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

  return (
    <HStack
      bg="primary.100"
      py="4"
      borderRadius="10"
      justifyContent="space-evenly"
    >
      <Box w="20%" textAlign="center">
        {data.name}
      </Box>

      <Box w="20%" textAlign="center">
        {data.tel}
      </Box>

      <Box w="20%" textAlign="center">
        {data.time}
      </Box>
      <Box w="20%" textAlign="center">
        {data.type}
      </Box>

      <Box w="20%" textAlign="center">
        {'payment' in data ? (
          data.payment ? (
            '결제 완료'
          ) : (
            <>
              <Button onClick={openPaymentModal}>금액 입력</Button>
              <PaymentModal
                isOpen={isPaymentOpen}
                onClose={closePaymentModal}
              />
            </>
          )
        ) : (
          <>
            <Button onClick={openCancelModal}>취소하기</Button>
            <CancelModal isOpen={isCancelOpen} onClose={closeCancelModal} />
          </>
        )}
      </Box>
    </HStack>
  );
}

export default TableRow;
