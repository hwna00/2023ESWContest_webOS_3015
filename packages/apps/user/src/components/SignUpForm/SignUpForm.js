import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import {
  Box,
  Button,
  ButtonGroup,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
  Select,
  Textarea,
  VStack,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { auth, createUserWithEmailAndPassword } from '../../../firebase';
import { updateProfile } from 'firebase/auth';
import PropTypes from 'prop-types';

const SignUpForm = function ({
  goToNext,
  goToPrevious,
  isActiveStep,
  isCompleteStep,
}) {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({ mode: 'onSubmit' });
  const navigate = useNavigate();
  const [formPosition, setFormPosition] = useState(0);

  const handleNext = useCallback(() => {
    //Todo: useForm의 trigger를 이용한 validation trigger 구현하기
    goToNext();
    setFormPosition(formPosition - 800); //Todo: 800 어케좀 하기
  }, [goToNext, setFormPosition, formPosition]);

  const handlePrev = useCallback(() => {
    goToPrevious();
    setFormPosition(formPosition + 800);
  }, [goToPrevious, setFormPosition, formPosition]);

  const onSubmit = function (data) {
    const { email, password, username } = data;
    createUserWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        const user = userCredential.user;
        if (user !== null) {
          updateProfile(user, {
            displayName: username,
          }).then(() => {
            navigate('/');
          });
        }
      })
      .catch(error => {
        //Todo: 예외 상황 처리하기
        console.log(error);
      });
  };
  return (
    <VStack
      as={'form'}
      onSubmit={handleSubmit(onSubmit)}
      alignItems={'flex-end'}
      gap={'4'}
      width={800}
      overflowX={'hidden'}
    >
      <Box height={'full'} width={800} p={'2'}>
        <HStack
          gap={0}
          as={motion.div}
          animate={{ x: formPosition }}
          transition={'0.1s linear'}
        >
          <VStack minWidth={800} gap={'4'} pr={'10'}>
            <FormControl width={'full'} isRequired isInvalid={errors.email}>
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
              <FormErrorMessage>
                {errors.email && errors.email.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl width={'full'} isRequired isInvalid={errors.username}>
              <FormLabel>이름</FormLabel>
              <Input
                required
                placeholder="성함을 입력해주세요."
                {...register('username', {
                  required: '이 항목은 필수입니다.',
                })}
              />
              <FormErrorMessage>
                {errors.username && errors.username.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl width={'full'} isRequired isInvalid={errors.password}>
              <FormLabel>비밀번호</FormLabel>
              <Input
                required
                type="password"
                placeholder="6자리 이상의 비밀번호를 입력해주세요."
                {...register('password', {
                  required: '이 항목은 필수입니다.',
                  min: { value: 6, message: '6자리 이상 입력해주세요.' },
                })}
              />
              <FormErrorMessage>
                {errors.password && errors.password.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl
              width={'full'}
              isRequired
              isInvalid={errors.checkPassword}
            >
              <FormLabel>비밀번호 확인</FormLabel>
              <Input
                required
                type="password"
                placeholder="필수 요소입니다."
                {...register('checkPassword', {
                  required: '이 항목은 필수입니다.',
                  validate: {
                    check: checkPassword => {
                      if (getValues('password') !== checkPassword) {
                        return '비밀번호가 일치하지 않습니다.';
                      }
                    },
                  },
                })}
              />
              <FormErrorMessage>
                {errors.checkPassword && errors.checkPassword.message}
              </FormErrorMessage>
            </FormControl>
          </VStack>

          <VStack minWidth={800} gap={'4'} pr={'10'}>
            <FormControl width={'full'} isRequired isInvalid={errors.birthDate}>
              <FormLabel>생년월일</FormLabel>
              <Input
                required
                type="date"
                placeholder="생년월일을 선택해주세요."
                {...register('birthDate', {
                  required: '이 항목은 필수입니다.',
                })}
              />
              <FormErrorMessage>
                {errors.birthDate && errors.birthDate.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl width={'full'} isRequired isInvalid={errors.address}>
              <FormLabel>주소</FormLabel>
              <Input
                required
                placeholder="옵션 요소입니다."
                {...register('address', {
                  required: '이 항목은 필수입니다.',
                })}
              />
              <FormErrorMessage>
                {errors.address && errors.address.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl
              width={'full'}
              isRequired
              isInvalid={errors.phoneNumber}
            >
              <FormLabel>전화번호</FormLabel>
              <InputGroup colorScheme="primary">
                <InputLeftAddon>010</InputLeftAddon>
                <Input
                  required
                  type="tel"
                  maxLength={'8'}
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
              <FormErrorMessage>
                {errors.phoneNumber && errors.phoneNumber.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl width={'full'} isInvalid={errors.secondPhoneNumber}>
              <FormLabel>비상 시 연락처</FormLabel>
              <InputGroup>
                <InputLeftAddon>010</InputLeftAddon>
                <Input
                  type="tel"
                  maxLength={'8'}
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
                {errors.secondPhoneNumber && errors.secondPhoneNumber.message}
              </FormErrorMessage>
            </FormControl>
          </VStack>

          <VStack minWidth={800} gap={'4'} pr={'10'}>
            <HStack width={'full'} gap={'4'}>
              <FormControl width={'full'} isInvalid={errors.bloodType}>
                <FormLabel>혈액형</FormLabel>
                <Select placeholder="혈액형" {...register('bloodType')}>
                  <option value="blood_A">A형</option>
                  <option value="blood_B">B형</option>
                  <option value="blood_O">O형</option>
                  <option value="blood_AB">AB형</option>
                </Select>
                <FormErrorMessage>
                  {errors.bloodType && errors.bloodType.message}
                </FormErrorMessage>
              </FormControl>

              <FormControl width={'full'} isInvalid={errors.height}>
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

              <FormControl width={'full'}>
                <FormLabel>몸무게</FormLabel>
                <InputGroup>
                  <Input
                    type="number"
                    placeholder="몸무게"
                    {...register('weight')}
                  />
                  <InputRightAddon>kg</InputRightAddon>
                </InputGroup>
                <FormErrorMessage>
                  {errors.weight && errors.weight.message}
                </FormErrorMessage>
              </FormControl>
            </HStack>

            <FormControl width={'full'} isInvalid={errors.chronicDisease}>
              <FormLabel>질환 정보</FormLabel>
              <Textarea
                resize={'none'}
                placeholder="평소 앓고 있었던 질병이 있다면 입력해주세요."
                {...register('chronicDisease')}
              />
              <FormErrorMessage>
                {errors.chronicDisease && errors.chronicDisease.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl width={'full'} isInvalid={errors.regularMedicines}>
              <FormLabel>복약 정보</FormLabel>
              <Textarea
                resize={'none'}
                placeholder="평소 지속적으로 복용하고 있는 약이 있다면 입력해주세요."
                {...register('regularMedicines')}
              />
            </FormControl>
            <FormErrorMessage>
              {errors.regularMedicines && errors.regularMedicines.message}
            </FormErrorMessage>
          </VStack>

          <VStack minWidth={800} gap={'4'} pr={'10'}>
            필요 프로필 사진 추가 //Todo: 사진 찍기
          </VStack>
        </HStack>
      </Box>

      <ButtonGroup gap={'4'}>
        {isCompleteStep(0) && (
          <Button
            type={'button'}
            onClick={handlePrev}
            colorScheme={'primary'}
            variant={'outline'}
          >
            이전으로
          </Button>
        )}
        {isActiveStep(3) ? (
          <Button type={'submit'} colorScheme={'primary'}>
            가입하기
          </Button>
        ) : (
          <Button
            key={'noSubmit'}
            type={'button'}
            onClick={handleNext}
            colorScheme={'primary'}
          >
            다음으로
          </Button>
        )}
      </ButtonGroup>
    </VStack>
  );
};

SignUpForm.propTypes = {
  goToNext: PropTypes.func.isRequired,
  goToPrevious: PropTypes.func.isRequired,
  isActiveStep: PropTypes.func.isRequired,
  isCompleteStep: PropTypes.func.isRequired,
};

export default SignUpForm;
