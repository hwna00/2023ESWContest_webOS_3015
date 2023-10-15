import { useState, useCallback } from 'react';

import { Link as ReactRouterLink, useParams } from 'react-router-dom';
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
  useDisclosure,
} from '@chakra-ui/react';

import Rating from '../../../components/StarRating/Rating';
import { createReivew } from '../../../api';
import { useSelector } from 'react-redux';

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
  const [reviewContent, setReviewContent] = useState('');
  const [rate, setRate] = useState(0);

  const { uid, doctorId, appointmentId } = useSelector(state => state.trmt);
  const { isOpen, onClose, onOpen } = useDisclosure();
  const onReviewChange = useCallback(e => {
    setReviewContent(e.target.value);
  }, []);
  const onSaveReviewClick = useCallback(() => {
    createReivew({
      uid,
      doctorId,
      appointmentId,
      rate,
      content: reviewContent,
    });

    onOpen();
  }, [onOpen, rate, reviewContent, uid, doctorId, appointmentId]);

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
            textDecoration="underline"
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
          rating={rate}
          onRatingChange={setRate}
        />
      </Box>

      <Textarea
        width="520px"
        height="120px"
        placeholder="리뷰를 남겨주세요"
        p="4"
        onChange={onReviewChange}
      />

      <HStack spacing="4" p="4">
        <ChakraLink as={ReactRouterLink} to="/">
          <Button leftIcon={<BiUndo />} colorScheme="primary" variant="outline">
            메인 페이지로
          </Button>
        </ChakraLink>
        <Button
          leftIcon={<BiCommentEdit />}
          colorScheme="primary"
          onClick={onSaveReviewClick}
        >
          저장하기
        </Button>
      </HStack>
      <ConfirmModal isOpen={isOpen} onClose={onClose} />
    </VStack>
  );
}

export default Review;
