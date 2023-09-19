import { useState, useCallback } from 'react';

import { Link as ReactRouterLink } from 'react-router-dom';
import { BiCommentEdit, BiUndo } from 'react-icons/bi';
import {
  VStack,
  Box,
  Textarea,
  Button,
  HStack,
  Link as ChakraLink,
  Modal,
  ModalContent,
  ModalBody,
  ModalFooter,
  ModalOverlay,
  Icon,
  Text,
} from '@chakra-ui/react';

import Rating from '../../components/StarRating/Rating';

function ConfirmModal({ isOpen, onClose }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered="true">
      <ModalOverlay />
      <ModalContent>
        <ModalBody textAlign="center" pt="16" fontSize="20" fontWeight="bold">
          리뷰가 저장되었습니다.
        </ModalBody>

        <ModalFooter display="flex" justifyContent="center">
          <ChakraLink as={ReactRouterLink} to="/">
            <Button colorScheme="primary" w="36">
              <Icon as={BiUndo} p="1" boxSize="8" />
              메인 페이지로
            </Button>
          </ChakraLink>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

function Review() {
  const [isOpen, setIsOpen] = useState(false);
  const onOpen = useCallback(() => setIsOpen(true), []);
  const onClose = useCallback(() => setIsOpen(false), []);

  return (
    <VStack justifyContent="center" height="full">
      <Box>
        <Text fontSize="40px" textAlign="center" p="2">
          오늘 진료는 어떠셨나요?
        </Text>
        <Text fontSize="24px" textAlign="center" p="2">
          처방전은{' '}
          <ChakraLink
            as={ReactRouterLink}
            to="/appointment-history"
            fontWeight="bold"
          >
            진료 내역
          </ChakraLink>
          에서 확인하실 수 있습니다.
        </Text>
      </Box>
      <Box p="4">
        <Rating
          size={48}
          scale={5}
          fillColor="primary.500"
          strokeColor="grey"
        />
      </Box>
      <Textarea
        width="520px"
        height="120px"
        placeholder="리뷰를 남겨주세요"
        p="4"
      />

      <HStack spacing="4" p="4">
        <ChakraLink as={ReactRouterLink} to="/">
          <Button colorScheme="primary" w="36">
            <Icon as={BiUndo} p="1" boxSize="8" />
            메인 페이지로
          </Button>
        </ChakraLink>
        <Button colorScheme="primary" w="36" onClick={onOpen}>
          <Icon as={BiCommentEdit} p="1" boxSize="8" />
          리뷰 남기기
        </Button>
      </HStack>
      <ConfirmModal isOpen={isOpen} onClose={onClose} />
    </VStack>
  );
}

export default Review;
