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
  Button,
  StepNumber,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import SignUpForm from '../../../components/SignUpForm/SignUpForm';

//Todo: 어케 바꾸지..?
const steps = [{}, {}, {}, {}];

const SignUp = function () {
  const { activeStep, goToNext, goToPrevious, isActiveStep, isCompleteStep } =
    useSteps({
      index: 0,
      count: steps.length,
    });
  const [formPosition, setFormPosition] = useState(0);

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
          <SignUpForm formPosition={formPosition} />

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
