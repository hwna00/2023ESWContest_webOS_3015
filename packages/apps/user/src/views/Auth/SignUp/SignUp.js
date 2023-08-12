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
  StepNumber,
  StepSeparator,
  FormControl,
  Input,
  Button,
} from '@chakra-ui/react';

const steps = [{}, {}, {}, {}];

const SignUp = function () {
  const { activeStep, goToNext, goToPrevious, isActiveStep, isCompleteStep } =
    useSteps({
      index: 0,
      count: steps.length,
    });

  return (
    <VStack height={'100vh'} p={'6'}>
      <HStack width={'full'} justifyContent={'start'} alignItems={'end'}>
        <Heading as={'h1'}>Housepital 회원가입</Heading>
        <ChakraLink as={ReactRouterLink} to={'/auth/login'}>
          이미 계정이 있으신가요? 로그인
        </ChakraLink>
      </HStack>
      <HStack height={'full'}>
        <Box height={'full'} py={'12'}>
          <Stepper
            index={activeStep}
            orientation="vertical"
            height={'full'}
            gap="0"
            colorScheme="primary"
          >
            {steps.map((step, index) => (
              <Step key={index}>
                <StepIndicator>
                  <StepStatus
                    complete={<StepIcon />}
                    incomplete={<StepNumber />}
                    active={<StepNumber />}
                  />
                </StepIndicator>

                <StepSeparator />
              </Step>
            ))}
          </Stepper>
        </Box>
        <VStack>
          <FormControl>
            <Input variant={'filled'} placeholder="아이디"></Input>
            <Input variant={'filled'} placeholder="이름"></Input>
            <Input variant={'filled'} placeholder="비밀번호"></Input>
            <Input variant={'filled'} placeholder="비밀번호 확인"></Input>
          </FormControl>
          {isCompleteStep(0) ? (
            <Button onClick={goToPrevious}>이전으로</Button>
          ) : null}
          {isActiveStep(3) ? (
            <Button onClick={goToNext}>가입하기</Button>
          ) : (
            <Button onClick={goToNext}>다음으로</Button>
          )}
        </VStack>
      </HStack>
    </VStack>
  );
};

export default SignUp;
