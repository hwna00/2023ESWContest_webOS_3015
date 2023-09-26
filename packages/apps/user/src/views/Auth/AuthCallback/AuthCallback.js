import { useCallback, useState } from 'react';

import { Form, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { DaumPostcodeEmbed } from 'react-daum-postcode';
import {
  Button,
  ButtonGroup,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Heading,
  Input,
  Modal,
  ModalContent,
  ModalOverlay,
  VStack,
  useDisclosure,
  InputGroup,
  InputRightAddon,
  Textarea,
  Select,
  InputLeftAddon,
  Box,
} from '@chakra-ui/react';
import { fbTokenLogIn } from '../../../../firebase';

const AuthCallback = function () {
  const [address, setAddress] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: 'all' });

  const handleComplete = useCallback(
    data => {
      setAddress(data.address);
      onClose();
    },
    [onClose],
  );

  const onSubmit = data => {
    fbTokenLogIn(data).then(user => {
      if (user) {
        navigate('/mypage');
      }
    });
  };

  return (
    <VStack height="100vh" justifyContent="center">
      <Heading as="h1" mb="8">
        추가 정보를 입력해주세요
      </Heading>
      <Box height={'70%'} overflowY={'scroll'}>
        <VStack as={'form'} onSubmit={handleSubmit(onSubmit)} gap={'4'}>
          <FormControl width="full" isRequired isInvalid={errors.address}>
            <FormLabel margin={0}>주소</FormLabel>
            <Input
              required
              placeholder="주소"
              {...register('address', {
                required: '이 항목은 필수입니다.',
              })}
              value={address}
              onClick={onOpen}
              readOnly
            />
            <FormErrorMessage>{errors?.address?.message}</FormErrorMessage>
          </FormControl>

          <FormControl width="full" isRequired isInvalid={errors.addressDetail}>
            <FormLabel margin={0}>주소 상세</FormLabel>
            <Input
              required
              placeholder="상세 주소"
              {...register('addressDetail', {
                required: '이 항목은 필수입니다.',
              })}
            />
            <FormErrorMessage>
              {errors?.addressDetail?.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl width="full" isInvalid={errors.secondPhoneNumber}>
            <FormLabel>비상 시 연락처</FormLabel>
            <InputGroup>
              <InputLeftAddon>010</InputLeftAddon>
              <Input
                type="tel"
                maxLength="8"
                placeholder="옵션 요소입니다."
                {...register('secondPhoneNumber', {
                  pattern: {
                    value: /^[0-9]{8}$/i,
                    message: '전화번호는 8자리의 숫자로만 이루어져야 합니다.',
                  },
                })}
              />
            </InputGroup>
            <FormErrorMessage>
              {errors.secondPhoneNumber?.message}
            </FormErrorMessage>
          </FormControl>

          <HStack width="full" gap="4">
            <FormControl width="full" isInvalid={errors.bloodType}>
              <FormLabel>혈액형</FormLabel>
              <Select placeholder="혈액형" {...register('bloodType')}>
                <option value="blood_A">A형</option>
                <option value="blood_B">B형</option>
                <option value="blood_O">O형</option>
                <option value="blood_AB">AB형</option>
              </Select>
              <FormErrorMessage>{errors.bloodType?.message}</FormErrorMessage>
            </FormControl>

            <FormControl width="full" isInvalid={errors.height}>
              <FormLabel>키</FormLabel>
              <InputGroup>
                <Input
                  type="number"
                  placeholder="키"
                  {...register('height', {
                    pattern: {
                      value: /^[0-9]/i,
                      message: '키는 숫자로만 이루어져야 합니다.',
                    },
                  })}
                />
                <InputRightAddon>cm</InputRightAddon>
              </InputGroup>
              <FormErrorMessage>{errors.height?.message}</FormErrorMessage>
            </FormControl>

            <FormControl width="full" isInvalid={errors.weight}>
              <FormLabel>몸무게</FormLabel>
              <InputGroup>
                <Input
                  type="number"
                  placeholder="몸무게"
                  {...register('weight')}
                />
                <InputRightAddon>kg</InputRightAddon>
              </InputGroup>
              <FormErrorMessage>{errors.weight?.message}</FormErrorMessage>
            </FormControl>
          </HStack>

          <FormControl width="full" isInvalid={errors.chronicDisease}>
            <FormLabel>질환 정보</FormLabel>
            <Textarea
              resize="none"
              placeholder="평소 앓고 있었던 질병이나 수술 이력이 있다면 입력해주세요."
              {...register('chronicDisease')}
            />
            <FormErrorMessage>
              {errors.chronicDisease?.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl width="full" isInvalid={errors.regularMedicines}>
            <FormLabel>복약 정보</FormLabel>
            <Textarea
              resize="none"
              placeholder="평소 지속적으로 복용하고 있는 약이 있다면 입력해주세요."
              {...register('regularMedicines')}
            />
            <FormErrorMessage>
              {errors.regularMedicines?.message}
            </FormErrorMessage>
          </FormControl>

          <ButtonGroup
            width={'full'}
            mt="6"
            display="flex"
            justifyContent="flex-end"
          >
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
        </VStack>
      </Box>
    </VStack>
  );
};

export default AuthCallback;
