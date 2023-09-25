import React, { useCallback, useState } from 'react';

import { Link as ReactRouterLink } from 'react-router-dom';
import {
  Box,
  Button,
  Divider,
  HStack,
  Heading,
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
  SimpleGrid,
  Text,
  VStack,
  useDisclosure,
  Link as ChakraLink,
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

const MainPage = function () {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <VStack p="8" spacing="8" alignItems="initial">
      <Heading textAlign="left" p="4" fontSize="30px">
        병원이름
      </Heading>
      <Box>
        <SimpleGrid w="full" spacing="8" placeItems="center" columns={3}>
          <VStack
            h="full"
            w="full"
            minW="40"
            bg="primary.100"
            borderRadius={10}
            padding="4"
            justifyContent="space-between"
          >
            <Text fontSize="2xl" fontWeight="bold">
              오늘 예정된 예약
            </Text>
            <Text w="90%" fontSize="5xl" align="right">
              13건
            </Text>
          </VStack>
          <VStack
            h="full"
            w="full"
            minW="40"
            bg="primary.100"
            borderRadius={10}
            padding="4"
            justifyContent="space-between"
          >
            <Text fontSize="2xl" fontWeight="bold">
              완료 대기
            </Text>
            <Text w="90%" fontSize="5xl" align="right">
              4건
            </Text>
          </VStack>
          <VStack
            h="full"
            w="full"
            minW="40"
            bg="primary.100"
            borderRadius={10}
            padding="4"
            justifyContent="space-between"
          >
            <Text fontSize="2xl" fontWeight="bold">
              전체 환자
            </Text>
            <Text w="90%" fontSize="5xl" align="right">
              17건
            </Text>
          </VStack>
        </SimpleGrid>
      </Box>
      <Box>
        <HStack justifyContent="space-between">
          <Heading fontSize="25px">다음 예약</Heading>
          <ChakraLink as={ReactRouterLink} to="/">
            + 전체보기
          </ChakraLink>
        </HStack>
        <HStack mt="7" justifyContent="space-evenly">
          <Box w="20%" textAlign="center" fontWeight="bold">
            이름
          </Box>
          <Box w="20%" textAlign="center" fontWeight="bold">
            전화번호
          </Box>
          <Box w="20%" textAlign="center" fontWeight="bold">
            진료시간
          </Box>
          <Box w="20%" textAlign="center" fontWeight="bold">
            타입
          </Box>
          <Box w="20%" textAlign="center" fontWeight="bold">
            액션
          </Box>
        </HStack>
        <Divider h="0.5" mb="1" bgColor="black" />
        <HStack
          bg="primary.100"
          py="4"
          borderRadius="10"
          justifyContent="space-evenly"
        >
          <Box w="20%" textAlign="center">
            이름
          </Box>
          <Box w="20%" textAlign="center">
            전화번호
          </Box>
          <Box w="20%" textAlign="center">
            진료시간
          </Box>
          <Box w="20%" textAlign="center">
            타입
          </Box>
          <Box w="20%" textAlign="center">
            <Button onClick={onOpen}>취소하기</Button>
            <CancelModal isOpen={isOpen} onClose={onClose} />
          </Box>
        </HStack>
      </Box>
      <Box>
        <HStack justifyContent="space-between">
          <Heading fontSize="25px">완료 대기</Heading>
          <ChakraLink as={ReactRouterLink} to="/">
            + 전체보기
          </ChakraLink>
        </HStack>

        <HStack mt="7" justifyContent="space-evenly">
          <Box w="20%" textAlign="center" fontWeight="bold">
            이름
          </Box>
          <Box w="20%" textAlign="center" fontWeight="bold">
            전화번호
          </Box>
          <Box w="20%" textAlign="center" fontWeight="bold">
            진료시간
          </Box>
          <Box w="20%" textAlign="center" fontWeight="bold">
            타입
          </Box>
          <Box w="20%" textAlign="center" fontWeight="bold">
            결제상태
          </Box>
        </HStack>
        <Divider h="0.5" mb="1" bgColor="black" />
        <HStack
          bg="primary.100"
          py="4"
          borderRadius="10"
          justifyContent="space-evenly"
        >
          <Box w="20%" textAlign="center">
            이름
          </Box>
          <Box w="20%" textAlign="center">
            전화번호
          </Box>
          <Box w="20%" textAlign="center">
            진료시간
          </Box>
          <Box w="20%" textAlign="center">
            타입
          </Box>
          <Box w="20%" textAlign="center">
            결제 상태
          </Box>
        </HStack>
      </Box>
    </VStack>
  );
};

export default MainPage;
