import { useState } from 'react';
import { Link as ReactRouterLink } from 'react-router-dom';
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
  FormControl,
  Input,
  Button,
  FormLabel,
  Textarea,
  StepNumber,
  InputGroup,
  InputLeftAddon,
  Select,
  InputRightAddon,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';

//Todo: 어케 바꾸지..?
const steps = [{}, {}, {}, {}];

const SignUp = function () {
  const { activeStep, goToNext, goToPrevious, isActiveStep, isCompleteStep } =
    useSteps({
      index: 0,
      count: steps.length,
    });
  const [formPosition, setFormPosition] = useState(0);
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleNext = function () {
    goToNext();
    setFormPosition(formPosition - 800); //Todo: 800 어케좀 하기
  };

  const handlePrev = function () {
    goToPrevious();
    setFormPosition(formPosition + 800);
  };

  const onSubmit = function (data) {
    console.log('hi');
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
        <Box height={'full'} py={'12'}>
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

        <VStack as="form" onSubmit={() => console.log('on submit')} gap={'4'}>
          <Box width={800} overflow={'hidden'}>
            <HStack
              gap={0}
              as={motion.div}
              animate={{ x: formPosition }}
              transition={'0.1s linear'}
            >
              <VStack minWidth={800} gap={'4'} pr={'10'}>
                <FormControl width={'full'} isRequired>
                  <FormLabel>이메일</FormLabel>
                  <Input
                    required
                    type="email"
                    placeholder="필수 요소입니다."
                    borderColor={'primary.300'}
                    {...register('email', { required: true })}
                  />
                </FormControl>
                <FormControl width={'full'} isRequired>
                  <FormLabel>이름</FormLabel>
                  <Input
                    required
                    placeholder="필수 요소입니다."
                    borderColor={'primary.300'}
                    {...register('username', { required: true })}
                  />
                </FormControl>
                <FormControl width={'full'} isRequired>
                  <FormLabel>비밀번호</FormLabel>
                  <Input
                    required
                    type="password"
                    placeholder="필수 요소입니다."
                    borderColor={'primary.300'}
                    {...register('password', { required: true })}
                  />
                </FormControl>
                <FormControl width={'full'} isRequired>
                  <FormLabel>비밀번호 확인</FormLabel>
                  <Input
                    required
                    type="password"
                    placeholder="필수 요소입니다."
                    borderColor={'primary.300'}
                    {...register('check-password', { required: true })}
                  />
                </FormControl>
              </VStack>

              <VStack minWidth={800} gap={'4'} pr={'10'}>
                <FormControl width={'full'} isRequired>
                  <FormLabel>생년월일</FormLabel>
                  <Input
                    required
                    type="date"
                    placeholder="필수 요소입니다."
                    borderColor={'primary.300'}
                    {...register('birth-date', { required: true })}
                  />
                </FormControl>
                <FormControl width={'full'} isRequired>
                  <FormLabel>주소</FormLabel>
                  <Input
                    required
                    placeholder="옵션 요소입니다."
                    borderColor={'primary.300'}
                    {...register('address')}
                  />
                </FormControl>
                <FormControl width={'full'} isRequired>
                  <FormLabel>전화번호</FormLabel>
                  <InputGroup colorScheme="primary">
                    <InputLeftAddon
                      children="010"
                      bgColor={'primary.100'}
                      border={'1px solid primary'}
                    />
                    <Input
                      required
                      type="tel"
                      maxLength={'8'}
                      placeholder="필수 요소입니다."
                      borderColor={'primary.300'}
                      {...register('phone-nubmer', { required: true })}
                    />
                  </InputGroup>
                </FormControl>
                <FormControl width={'full'}>
                  <FormLabel>비상 시 연락처</FormLabel>
                  <InputGroup>
                    <InputLeftAddon
                      children="010"
                      bgColor={'primary.100'}
                      border={'1px solid primary'}
                    />
                    <Input
                      required
                      type="tel"
                      maxLength={'8'}
                      placeholder="옵션 요소입니다."
                      borderColor={'primary.300'}
                      {...register('second-phone-number')}
                    />
                  </InputGroup>
                </FormControl>
              </VStack>

              <VStack minWidth={800} gap={'4'} pr={'10'}>
                <HStack width={'full'} gap={'4'}>
                  <FormControl width={'full'}>
                    <FormLabel>혈액형</FormLabel>
                    <Select placeholder="혈액형">
                      <option value="option1">A형</option>
                      <option value="option2">B형</option>
                      <option value="option3">O형</option>
                      <option value="option3">AB형</option>
                    </Select>
                  </FormControl>
                  <FormControl width={'full'}>
                    <FormLabel>키</FormLabel>
                    <InputGroup>
                      <Input type="number" placeholder="키" />
                      <InputRightAddon children="cm" />
                    </InputGroup>
                  </FormControl>
                  <FormControl width={'full'}>
                    <FormLabel>몸무게</FormLabel>
                    <InputGroup>
                      <Input type="number" placeholder="몸무게" />
                      <InputRightAddon children="kg" />
                    </InputGroup>
                  </FormControl>
                </HStack>
                <FormControl width={'full'}>
                  <FormLabel>건강 정보</FormLabel>
                  <Textarea
                    resize={'none'}
                    placeholder="복용하고 있는 약이 있다면 적어주세요"
                  />
                </FormControl>
                <FormControl width={'full'}>
                  <FormLabel>건강 정보</FormLabel>
                  <Textarea
                    resize={'none'}
                    placeholder="복용하고 있는 약이 있다면 적어주세요"
                  />
                </FormControl>
              </VStack>

              <VStack minWidth={800} gap={'4'} pr={'10'}>
                //Todo: 사진 찍기 필요
              </VStack>
            </HStack>
          </Box>

          <HStack
            width={'full'}
            justifyContent={'flex-end'}
            alignItems={'center'}
            gap={'4'}
          >
            {isCompleteStep(0) ? (
              <Button
                onClick={handlePrev}
                colorScheme="primary"
                variant={'outline'}
              >
                이전으로
              </Button>
            ) : null}
            {isActiveStep(3) ? (
              <Button
                type="submit"
                // onClick={handleSubmit(onSubmit)}
                colorScheme="primary"
              >
                가입하기
              </Button>
            ) : (
              <Button onClick={handleNext} colorScheme="primary">
                다음으로
              </Button>
            )}
          </HStack>
        </VStack>
      </HStack>
    </VStack>
  );
};

export default SignUp;
