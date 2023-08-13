import { useState } from 'react';
import { Link as ReactRouterLink, useNavigate } from 'react-router-dom';
import {
  HStack,
  Heading,
  VStack,
  Link as ChakraLink,
  Box,
  useSteps,
  Stepper,
  Step,
  StepIndicator,
  StepStatus,
  StepIcon,
  StepSeparator,
  Button,
  StepNumber,
  FormControl,
  Input,
  FormLabel,
  Textarea,
  InputGroup,
  InputLeftAddon,
  Select,
  InputRightAddon,
  FormErrorMessage,
  ButtonGroup,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { auth, createUserWithEmailAndPassword } from '../../../../firebase';
import { updateProfile } from 'firebase/auth';

//Todo: 어케 바꾸지..?
const steps = [{}, {}, {}, {}];

const SignUp = function () {
  const navigate = useNavigate();
  const { activeStep, goToNext, goToPrevious, isActiveStep, isCompleteStep } =
    useSteps({
      index: 0,
      count: steps.length,
    });
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({ mode: 'onSubmit' });

  const [formPosition, setFormPosition] = useState(0);

  const handleNext = async function () {
    //Todo: useForm의 trigger를 이용한 validation trigger 구현하기
    goToNext();
    setFormPosition(formPosition - 800); //Todo: 800 어케좀 하기
  };

  const handlePrev = function () {
    goToPrevious();
    setFormPosition(formPosition + 800);
  };
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
    <VStack height={'100vh'} p={'6'}>
      <HStack width={'full'} justifyContent={'start'} alignItems={'end'}>
        <Heading as={'h1'}>Housepital 회원가입</Heading>
        <ChakraLink as={ReactRouterLink} to={'/auth/login'}>
          이미 계정이 있으신가요? 로그인
        </ChakraLink>
      </HStack>

      <HStack height={'full'} width={'full'} px={'12'} py={'6'} gap={'12'}>
        <Box height={'full'} py={'8'}>
          <Stepper
            as={motion.div}
            index={activeStep}
            orientation="vertical"
            height={'full'}
            gap="0"
            colorScheme="primary"
          >
            {steps.map((step, index) => (
              <Step key={index}>
                <StepIndicator transition="0.1s linear">
                  <StepStatus incomplete={<StepNumber />} />
                  <StepStatus complete={<StepIcon />} />
                  <StepStatus active={<StepNumber />} />
                </StepIndicator>

                <StepSeparator />
              </Step>
            ))}
          </Stepper>
        </Box>

        <VStack as="form" gap={'4'} alignItems={'flex-end'}>
          <Box height={'full'} width={800} overflowX={'hidden'} p={'2'}>
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

                <FormControl
                  width={'full'}
                  isRequired
                  isInvalid={errors.username}
                >
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

                <FormControl
                  width={'full'}
                  isRequired
                  isInvalid={errors.password}
                >
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
                <FormControl
                  width={'full'}
                  isRequired
                  isInvalid={errors.birthDate}
                >
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

                <FormControl
                  width={'full'}
                  isRequired
                  isInvalid={errors.address}
                >
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
                          message:
                            '전화번호는 8자리의 숫자로만 이루어져야 합니다.',
                        },
                      })}
                    />
                  </InputGroup>
                  <FormErrorMessage>
                    {errors.phoneNumber && errors.phoneNumber.message}
                  </FormErrorMessage>
                </FormControl>

                <FormControl
                  width={'full'}
                  isInvalid={errors.secondPhoneNumber}
                >
                  <FormLabel>비상 시 연락처</FormLabel>
                  <InputGroup>
                    <InputLeftAddon children="010" />
                    <Input
                      type="tel"
                      maxLength={'8'}
                      placeholder="옵션 요소입니다."
                      {...register('secondPhoneNumber', {
                        pattern: {
                          value: /^[0-9]{8}$/i,
                          message:
                            '전화번호는 8자리의 숫자로만 이루어져야 합니다.',
                        },
                      })}
                    />
                  </InputGroup>
                  <FormErrorMessage>
                    {errors.secondPhoneNumber &&
                      errors.secondPhoneNumber.message}
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
                      <InputRightAddon children="cm" />
                    </InputGroup>
                    <FormErrorMessage>
                      {errors.height?.message}
                    </FormErrorMessage>
                  </FormControl>

                  <FormControl width={'full'}>
                    <FormLabel>몸무게</FormLabel>
                    <InputGroup>
                      <Input
                        type="number"
                        placeholder="몸무게"
                        {...register('weight')}
                      />
                      <InputRightAddon children="kg" />
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
                onClick={handlePrev}
                colorScheme="primary"
                variant={'outline'}
              >
                이전으로
              </Button>
            )}
            {isActiveStep(3) ? (
              <Button colorScheme="primary" onClick={handleSubmit(onSubmit)}>
                가입하기
              </Button>
            ) : (
              <Button onClick={handleNext} colorScheme="primary">
                다음으로
              </Button>
            )}
          </ButtonGroup>
        </VStack>
      </HStack>
    </VStack>
  );
};

export default SignUp;
