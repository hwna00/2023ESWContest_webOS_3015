import { useCallback, useState } from 'react';

import { Form } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { DaumPostcodeEmbed } from 'react-daum-postcode';
import {
  Button,
  ButtonGroup,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Modal,
  ModalContent,
  ModalOverlay,
  VStack,
  useDisclosure,
} from '@chakra-ui/react';


const AuthCallback = function () {
  const [address, setAddress] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleComplete = useCallback(
    data => {
      setAddress(data.address);
      onClose();
    },
    [onClose],
  );

  const onSubmit = data => {
    // TODO 데이터의 address와 addressDetail을 서버로 전송
    console.log(data);
  };

  return (
    <VStack height="100vh" justifyContent="center">
      <Heading as="h1" mb="8">
        필수 정보를 입력해주세요
      </Heading>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormControl width="full" isRequired isInvalid={errors.address}>
          <FormLabel margin={0}>주소</FormLabel>

          <Input
            required
            placeholder="주소"
            mb="2"
            {...register('address', {
              required: '이 항목은 필수입니다.',
            })}
            value={address}
            onClick={onOpen}
            readOnly
          />
          <Input
            required
            placeholder="상세 주소"
            {...register('addressDetail', {
              required: '이 항목은 필수입니다.',
            })}
          />

          <FormErrorMessage>{errors?.message}</FormErrorMessage>
        </FormControl>

        <ButtonGroup mt="6" display="flex" justifyContent="flex-end">
          <Button type="submit" colorScheme="primary">
            제출하기
          </Button>
        </ButtonGroup>

        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <DaumPostcodeEmbed onComplete={handleComplete} />
          </ModalContent>
        </Modal>
      </Form>
    </VStack>
  );
};

export default AuthCallback;
