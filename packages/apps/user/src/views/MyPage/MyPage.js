import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Input,
  InputGroup,
  InputRightAddon,
  InputLeftAddon,
  Select,
  VStack,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  Textarea,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { DaumPostcodeEmbed } from 'react-daum-postcode';
import { useCallback, useEffect, useState } from 'react';
import { updateMe } from '../../api';
import useCreateToast from '../../hooks/useCreateToast';

//TODO: 성별 정보를 회원가입에서 받아야 함
//TODO: 끝나면 인증페이지 접근 제한
const MyPage = function () {
  const [address, setAddress] = useState('');

  const me = useSelector(state => state.me);
  const toast = useCreateToast();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ mode: 'all', defaultValues: me });
  const { isOpen, onOpen, onClose } = useDisclosure();

  const onSubmit = data => {
    updateMe(me.uid, data)
      .then(() => {
        toast('수정에 성공했습니다.');
        console.log('성공');
      })
      .catch(err => {
        toast('수정에 실패했습니다.');
        console.log(err);
      });
  };

  const handleComplete = useCallback(
    data => {
      setAddress(data.address);
      onClose();
    },
    [onClose],
  );

  useEffect(() => {
    reset(me);
  }, [reset, me]);

  return (
    <Box height={'full'} overflowY={'scroll'}>
      <VStack as={'form'} width={'full'} onSubmit={handleSubmit(onSubmit)}>
        <HStack
          width={'full'}
          justifyContent={'center'}
          alignItems={'center'}
          gap={'12'}
        >
          <Avatar src={me.profileImg} size={'2xl'} />
          <VStack width={'sm'}>
            <FormControl width="full" isRequired isInvalid={errors.username}>
              <FormLabel>이름</FormLabel>
              <Input
                required
                placeholder="성함을 입력해주세요."
                {...register('username', {
                  required: '이 항목은 필수입니다.',
                })}
              />
              <FormErrorMessage>{errors.username?.message}</FormErrorMessage>
            </FormControl>

            <FormControl width="full" isRequired isInvalid={errors.email}>
              <FormLabel>이메일</FormLabel>
              <Input
                required
                type="email"
                placeholder="이메일을 입력해주세요."
                {...register('email', {
                  required: '이 항목은 필수입니다.',
                  pattern: {
                    value:
                      /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i,
                    message: '이메일 형식이 아닙니다.',
                  },
                })}
              />
              <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
            </FormControl>
          </VStack>
        </HStack>

        <VStack>
          <FormControl width="full" isRequired isInvalid={errors.birthDate}>
            <FormLabel>생년월일</FormLabel>
            <Input
              required
              type="date"
              placeholder="생년월일을 선택해주세요."
              {...register('birthDate', {
                required: '이 항목은 필수입니다.',
              })}
            />
            <FormErrorMessage>{errors.birthDate?.message}</FormErrorMessage>
          </FormControl>
          {/* //! 주소값이 사라지는 버그 발생 */}
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
          <FormControl width="full" isRequired isInvalid={errors.phoneNumber}>
            <FormLabel>전화번호</FormLabel>
            <InputGroup colorScheme="primary">
              <InputLeftAddon>010</InputLeftAddon>
              <Input
                required
                type="tel"
                maxLength="8"
                placeholder="필수 요소입니다."
                {...register('phoneNumber', {
                  required: '이 항목은 필수입니다.',
                  pattern: {
                    value: /^[0-9]{8}$/i,
                    message: '전화번호는 8자리의 숫자로만 이루어져야 합니다.',
                  },
                })}
              />
            </InputGroup>
            <FormErrorMessage>{errors.phoneNumber?.message}</FormErrorMessage>
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
          {/* // ! 혈액형의 초기값이 마이페이지에 적용되지 않는 에러 발생 */}
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
        </VStack>
        <ButtonGroup
          display={'flex'}
          justifyContent={'center'}
          mt={'8'}
          gap={'4'}
        >
          <Button type="submit" size={'lg'} colorScheme="primary">
            저장하기
          </Button>
        </ButtonGroup>
      </VStack>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <DaumPostcodeEmbed onComplete={handleComplete} />
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default MyPage;
