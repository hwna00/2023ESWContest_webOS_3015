import { useState, useCallback } from 'react';

import { Link as ReactRouterLink } from 'react-router-dom';
import { BiCommentEdit } from '@react-icons/all-files/bi/BiCommentEdit';
import { BiUndo } from '@react-icons/all-files/bi/BiUndo';
import {
  VStack,
  Box,
  Textarea,
  Button,
  HStack,
  Link as ChakraLink,
  Modal,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  Text,
  ModalHeader,
} from '@chakra-ui/react';

import Rating from '../../components/StarRating/Rating';

function ConfirmModal({ isOpen, onClose }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered="true">
      <ModalOverlay />
      <ModalContent py="8">
        <ModalHeader>
          <Text textAlign="center" fontSize="20" fontWeight="bold">
            리뷰가 저장되었습니다.
          </Text>
        </ModalHeader>

        <ModalFooter display="flex" justifyContent="center">
          <ChakraLink as={ReactRouterLink} to="/">
            <Button leftIcon={<BiUndo />} colorScheme="primary">
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
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(0);

  const onOpen = useCallback(() => setIsOpen(true), []);
  const onClose = useCallback(() => setIsOpen(false), []);
  const handlereview = useCallback(e => {
    setReviewText(e.target.value);
  }, []);
  const saveReview = useCallback(() => {
    // DB로 리뷰랑 별점 전송
    console.log('리뷰 내용:', reviewText);

    onOpen();
  }, [onOpen, reviewText]);

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
          fillColor="yellow.400"
          strokeColor="grey"
          rating={rating}
          onRatingChange={setRating}
        />
      </Box>

      <Textarea
        width="520px"
        height="120px"
        placeholder="리뷰를 남겨주세요"
        p="4"
        onChange={handlereview}
      />

      <HStack spacing="4" p="4">
        <ChakraLink as={ReactRouterLink} to="/">
          <Button leftIcon={<BiUndo />} colorScheme="primary">
            메인 페이지로
          </Button>
        </ChakraLink>
        <Button
          leftIcon={<BiCommentEdit />}
          colorScheme="primary"
          onClick={saveReview}
        >
          저장하기
        </Button>
      </HStack>
      <ConfirmModal isOpen={isOpen} onClose={onClose} />
    </VStack>
  );
}

export default Review;
