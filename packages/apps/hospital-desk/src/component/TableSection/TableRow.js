import React, { useCallback } from 'react';

import { useNavigate } from 'react-router-dom';
import { Box, HStack, Button, useDisclosure } from '@chakra-ui/react';

import PaymentModal from '../PaymentModal/PaymentModal';
import CancelModal from '../CancelModal/CancelModal';

// eslint-disable-next-line react/prop-types
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
        {data.tel}
      </Box>

      <Box w="20%" textAlign="center">
        {data.time}
      </Box>
      <Box w="20%" textAlign="center">
        {data.type}
      </Box>

      <Box w="20%" alignContent="center" display="flex" justifyContent="center">
        {'payment' in data ? (
          data.payment ? (
            '결제 완료'
          ) : (
            <>
              <Button h="10" onClick={openPaymentModal}>
                금액 입력
              </Button>
              <PaymentModal
                isOpen={isPaymentOpen}
                onClose={closePaymentModal}
              />
            </>
          )
        ) : data.confirm === true ? (
          <>
            <Button h="10" onClick={openCancelModal} colorScheme="red">
              취소하기
            </Button>
            <CancelModal isOpen={isCancelOpen} onClose={closeCancelModal} />
          </>
        ) : (
          <>
            {/* 환자 상세정보 뜨도록 */}
            <HStack spacing="2" alignItems="center">
              <Button h="10" onClick={moveToDetail} colorScheme="primary">
                상세정보
              </Button>
              <PaymentModal
                isOpen={isPaymentOpen}
                onClose={closePaymentModal}
              />

              <Button h="10" onClick={openCancelModal} colorScheme="red">
                취소하기
              </Button>
            </HStack>
            <CancelModal isOpen={isCancelOpen} onClose={closeCancelModal} />
          </>
        )}
      </Box>
    </HStack>
  );
}

export default TableRow;
