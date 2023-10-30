import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import {
  Box,
  Step,
  StepIcon,
  StepIndicator,
  StepNumber,
  StepSeparator,
  StepStatus,
  Stepper,
} from '@chakra-ui/react';

const SignUpStepper = function ({ activeStep, steps }) {
  return (
    <Box height="full">
      <Stepper
        as={motion.div}
        index={activeStep}
        orientation="vertical"
        height="full"
        gap="0"
        colorScheme="primary"
      >
        {steps.map((_, index) => (
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
  );
};

SignUpStepper.propTypes = {
  activeStep: PropTypes.number.isRequired,
  steps: PropTypes.array.isRequired,
};

export default SignUpStepper;
