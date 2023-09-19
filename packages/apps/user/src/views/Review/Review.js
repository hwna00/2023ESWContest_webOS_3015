import { Link as ReactRouterLink } from 'react-router-dom';
import { useState } from 'react';
import {
  VStack,
  Heading,
  Box,
  Input,
  Button,
  HStack,
  Link as ChakraLink,
  Modal,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  ModalOverlay,
  Icon,
} from '@chakra-ui/react';
import { BiCommentEdit, BiUndo } from 'react-icons/bi';
import Rating from '../../components/StarRating/Rating';

function ConfirmModal({ isOpen, onClose }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered="true">
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />

        <ModalBody textAlign="center" pt="20" fontSize="20" fontWeight="bold">
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
  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);

  return (
    <VStack justifyContent="center" height={'full'}>
      <Box p="4">
        <Heading as="h2" fontSize="40px" textAlign="center" p="2">
          오늘 진료는 어떠셨나요?
        </Heading>
        <Heading as="h3" fontSize="24px" textAlign="center" p="2">
          처방전은 &ldquo;진료 내역&rdquo;에서 확인하실 수 있습니다.
        </Heading>
      </Box>
      <Box p="4">
        <Rating size={32} scale={5} fillColor="gold" strokeColor="grey" />
      </Box>
      <Input width="520px" height="120px" placeholder="리뷰를 남겨주세요" />

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
