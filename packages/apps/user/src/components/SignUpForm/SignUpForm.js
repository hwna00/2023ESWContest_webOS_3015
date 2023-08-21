import { useCallback, useRef, useState } from 'react';
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
import {
  browserLocalPersistence,
  setPersistence,
  updateProfile,
} from 'firebase/auth';
import PropTypes from 'prop-types';
import { auth, signIn } from '../../../firebase';

const SignUpForm = function ({
  activeStep,
  goToNext,
  goToPrevious,
  isActiveStep,
  isCompleteStep,
}) {
  const {
    register,
    handleSubmit,
    getValues,
    trigger,
    formState: { errors },
  } = useForm({ mode: 'all' });

  const navigate = useNavigate();
  const [formPosition, setFormPosition] = useState(0);
  const ref = useRef();

  const handleNext = useCallback(async () => {
    const isFullfilled = await trigger(`step${activeStep}`);
    if (isFullfilled) {
      const currentFormWidth = ref.current?.offsetWidth;
      setFormPosition(formPosition - currentFormWidth);
      goToNext();
    }
  }, [trigger, activeStep, goToNext, setFormPosition, formPosition]);

  const handlePrev = useCallback(() => {
    const currentFormWidth = ref.current?.offsetWidth;
    setFormPosition(formPosition + currentFormWidth);
    goToPrevious();
  }, [goToPrevious, setFormPosition, formPosition]);

  const onSubmit = function (data) {
    const {
      step0: { email, password, username },
    } = data;

    setPersistence(auth, browserLocalPersistence)
      .then(() => {
        signIn(email, password)
          .then(userCredential => {
            updateProfile(userCredential.user, {
              displayName: username,
            }).then(() => navigate('/'));
          })
          .catch(error => {
            console.log(error);
            navigate('/error');
          });
      })
      .catch(() => navigate('/error'));
  };

  const FORM_WIDTH = 700;

  return (
    <VStack
      as={'form'}
      onSubmit={handleSubmit(onSubmit)}
      alignItems={'flex-end'}
      gap={'4'}
      maxWidth={'full'}
      overflowY={'scroll'}
    >
      <Box ref={ref} width={FORM_WIDTH} overflowX={'hidden'} p={'2'}>
        <HStack
          gap={0}
          as={motion.div}
          animate={{ x: formPosition }}
          transition={'0.1s linear'}
        >
          <VStack minWidth={FORM_WIDTH} gap={'4'} pr={'4'}>
            <FormControl
              width={'full'}
              isRequired
              isInvalid={errors.step0?.email}
            >
              <FormLabel>이메일</FormLabel>
              <Input
                required
                type="email"
                placeholder="이메일을 입력해주세요."
                {...register('step0.email', {
                  required: '이 항목은 필수입니다.',
                  pattern: {
                    value:
                      /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i,
                    message: '이메일 형식이 아닙니다.',
                  },
                })}
              />
              <FormErrorMessage>
                {errors.step0?.email?.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl
              width={'full'}
              isRequired
              isInvalid={errors.step0?.username}
            >
              <FormLabel>이름</FormLabel>
              <Input
                required
                placeholder="성함을 입력해주세요."
                {...register('step0.username', {
                  required: '이 항목은 필수입니다.',
                })}
              />
              <FormErrorMessage>
                {errors.step0?.username?.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl
              width={'full'}
              isRequired
              isInvalid={errors.step0?.password}
            >
              <FormLabel>비밀번호</FormLabel>
              <Input
                required
                type="password"
                placeholder="6자리 이상의 비밀번호를 입력해주세요."
                {...register('step0.password', {
                  required: '이 항목은 필수입니다.',
                  minLength: { value: 6, message: '6자리 이상 입력해주세요.' },
                })}
              />
              <FormErrorMessage>
                {errors.step0?.password?.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl
              width={'full'}
              isRequired
              isInvalid={errors.step0?.checkPassword}
            >
              <FormLabel>비밀번호 확인</FormLabel>
              <Input
                required
                type="password"
                placeholder="필수 요소입니다."
                {...register('step0.checkPassword', {
                  required: '이 항목은 필수입니다.',
                  validate: {
                    check: checkPassword => {
                      if (getValues('step0.password') !== checkPassword) {
                        return '비밀번호가 일치하지 않습니다.';
                      }
                    },
                  },
                })}
              />
              <FormErrorMessage>
                {errors.step0?.checkPassword?.message}
              </FormErrorMessage>
            </FormControl>
          </VStack>

          <VStack minWidth={FORM_WIDTH} gap={'4'} pr={'4'}>
            <FormControl
              width={'full'}
              isRequired
              isInvalid={errors.step1?.birthDate}
            >
              <FormLabel>생년월일</FormLabel>
              <Input
                required
                type="date"
                placeholder="생년월일을 선택해주세요."
                {...register('step1.birthDate', {
                  required: '이 항목은 필수입니다.',
                })}
              />
              <FormErrorMessage>
                {errors.step1?.birthDate?.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl
              width={'full'}
              isRequired
              isInvalid={errors.step1?.address}
            >
              <FormLabel>주소</FormLabel>
              <Input
                required
                placeholder="옵션 요소입니다."
                {...register('step1.address', {
                  required: '이 항목은 필수입니다.',
                })}
              />
              <FormErrorMessage>
                {errors.step1?.address?.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl
              width={'full'}
              isRequired
              isInvalid={errors.step1?.phoneNumber}
            >
              <FormLabel>전화번호</FormLabel>
              <InputGroup colorScheme="primary">
                <InputLeftAddon>010</InputLeftAddon>
                <Input
                  required
                  type="tel"
                  maxLength={'8'}
                  placeholder="필수 요소입니다."
                  {...register('step1.phoneNumber', {
                    required: '이 항목은 필수입니다.',
                    pattern: {
                      value: /^[0-9]{8}$/i,
                      message: '전화번호는 8자리의 숫자로만 이루어져야 합니다.',
                    },
                  })}
                />
              </InputGroup>
              <FormErrorMessage>
                {errors.step1?.phoneNumber?.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl
              width={'full'}
              isInvalid={errors.step1?.secondPhoneNumber}
            >
              <FormLabel>비상 시 연락처</FormLabel>
              <InputGroup>
                <InputLeftAddon>010</InputLeftAddon>
                <Input
                  type="tel"
                  maxLength={'8'}
                  placeholder="옵션 요소입니다."
                  {...register('step1.secondPhoneNumber', {
                    pattern: {
                      value: /^[0-9]{8}$/i,
                      message: '전화번호는 8자리의 숫자로만 이루어져야 합니다.',
                    },
                  })}
                />
              </InputGroup>
              <FormErrorMessage>
                {errors.step1?.secondPhoneNumber?.message}
              </FormErrorMessage>
            </FormControl>
          </VStack>

          <VStack minWidth={FORM_WIDTH} gap={'4'} pr={'4'}>
            <HStack width={'full'} gap={'4'}>
              <FormControl width={'full'} isInvalid={errors.step2?.bloodType}>
                <FormLabel>혈액형</FormLabel>
                <Select placeholder="혈액형" {...register('step2.bloodType')}>
                  <option value="blood_A">A형</option>
                  <option value="blood_B">B형</option>
                  <option value="blood_O">O형</option>
                  <option value="blood_AB">AB형</option>
                </Select>
                <FormErrorMessage>
                  {errors.step2?.bloodType?.message}
                </FormErrorMessage>
              </FormControl>

              <FormControl width={'full'} isInvalid={errors.step?.height}>
                <FormLabel>키</FormLabel>
                <InputGroup>
                  <Input
                    type="number"
                    placeholder="키"
                    {...register('step2.height', {
                      pattern: {
                        value: /^[0-9]/i,
                        message: '키는 숫자로만 이루어져야 합니다.',
                      },
                    })}
                  />
                  <InputRightAddon>cm</InputRightAddon>
                </InputGroup>
                <FormErrorMessage>
                  {errors.step2?.height?.message}
                </FormErrorMessage>
              </FormControl>

              <FormControl width={'full'} isInvalid={errors.step2?.weight}>
                <FormLabel>몸무게</FormLabel>
                <InputGroup>
                  <Input
                    type="number"
                    placeholder="몸무게"
                    {...register('step2.weight')}
                  />
                  <InputRightAddon>kg</InputRightAddon>
                </InputGroup>
                <FormErrorMessage>
                  {errors.step2?.weight?.message}
                </FormErrorMessage>
              </FormControl>
            </HStack>

            <FormControl
              width={'full'}
              isInvalid={errors.step2?.chronicDisease}
            >
              <FormLabel>질환 정보</FormLabel>
              <Textarea
                resize={'none'}
                placeholder="평소 앓고 있었던 질병이 있다면 입력해주세요."
                {...register('step2.chronicDisease')}
              />
              <FormErrorMessage>
                {errors.step2?.chronicDisease?.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl
              width={'full'}
              isInvalid={errors.step2?.regularMedicines}
            >
              <FormLabel>복약 정보</FormLabel>
              <Textarea
                resize={'none'}
                placeholder="평소 지속적으로 복용하고 있는 약이 있다면 입력해주세요."
                {...register('step2.regularMedicines')}
              />
              <FormErrorMessage>
                {errors.step2?.regularMedicines?.message}
              </FormErrorMessage>
            </FormControl>
          </VStack>

          <VStack minWidth={FORM_WIDTH} gap={'4'} pr={'4'}>
            프로필 사진 추가 필요 //Todo: 프로필 사진 찍기 기능 추가하기
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
