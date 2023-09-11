import { Link as ReactRouterLink } from 'react-router-dom';
import {
  HStack,
  Heading,
  VStack,
  Link as ChakraLink,
  useSteps,
  Container,
} from '@chakra-ui/react';

import SignUpStepper from '../../../components/SignUpStepper/SignUpStepper';
import SignUpForm from '../../../components/SignUpForm/SignUpForm';

const steps = ['first-step', 'second-step', 'third-step', 'last-step'];

const SignUp = function () {
  const { activeStep, goToNext, goToPrevious, isActiveStep, isCompleteStep } =
    useSteps({
      index: 0,
      count: steps.length,
    });

  return (
    <VStack height="100vh" p="6">
      <HStack width="full" justifyContent="start" alignItems="end">
        <Heading as="h1">Housepital 회원가입</Heading>
        <ChakraLink as={ReactRouterLink} to="/auth/log-in">
          이미 계정이 있으신가요? 로그인
        </ChakraLink>
      </HStack>

      <Container centerContent height="full" maxW="container.xl">
        <HStack
          justifyContent="center"
          gap="12"
          maxH={600}
          width="full"
          my="auto"
        >
          <SignUpStepper activeStep={activeStep} steps={steps} />

          <SignUpForm
            activeStep={activeStep}
            goToNext={goToNext}
            goToPrevious={goToPrevious}
            isActiveStep={isActiveStep}
            isCompleteStep={isCompleteStep}
          />
        </HStack>
      </Container>
    </VStack>
  );
};

export default SignUp;
