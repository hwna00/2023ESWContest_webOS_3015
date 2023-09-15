import { useCallback, useRef, useState } from 'react';

import { Outlet, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import {
  browserLocalPersistence,
  setPersistence,
  updateProfile,
} from 'firebase/auth';
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

import { auth, signIn } from '../../../firebase';

import UserFace from './UserFace';

const SignUpForm = function ({
  activeStep,
  goToNext,
  goToPrevious,
  isActiveStep,
  isCompleteStep,
}) {
  const reactHookForm = useForm({ mode: 'all' });

  const navigate = useNavigate();
  const [formPosition, setFormPosition] = useState(0);
  const ref = useRef();

  const handleNext = useCallback(async () => {
    // const currentFormWidth = ref.current?.offsetWidth;
    // setFormPosition(formPosition - currentFormWidth);
    navigate(`/auth/sign-up/step${activeStep + 2}`);
    goToNext();
  }, [activeStep, goToNext, setFormPosition, formPosition]);

  const handlePrev = useCallback(() => {
    // const currentFormWidth = ref.current?.offsetWidth;
    // setFormPosition(formPosition + currentFormWidth);
    navigate(`/auth/sign-up/step${activeStep}`);
    goToPrevious();
  }, [goToPrevious, setFormPosition, formPosition]);

  const profileImgSrc = useSelector(state => state.url);

  const onSubmit = function (data) {
    //Todo: 데이터 무결성 확인하기
    //Todo: 데이터를 store에 저장하기
    //Todo: navigate('/auth/sign-up/step2');
    // setPersistence(auth, browserLocalPersistence)
    //   .then(() => {
    //     signIn(email, password)
    //       .then(userCredential => {
    //         updateProfile(userCredential.user, {
    //           displayName: username,
    //         }).then(() => navigate('/'));
    //       })
    //       .catch(error => {
    //         console.log(error);
    //         navigate('/error');
    //       });
    //   })
    //   .catch(() => navigate('/error'));
  };

  return (
    <VStack
      as="form"
      onSubmit={reactHookForm.handleSubmit(onSubmit)}
      alignItems="flex-end"
      gap="4"
      maxWidth="full"
      overflowY="scroll"
    >
      <Outlet context={reactHookForm} />

      <ButtonGroup gap="4">
        {isCompleteStep(0) && (
          <Button
            type="button"
            onClick={handlePrev}
            colorScheme="primary"
            variant="outline"
          >
            이전으로
          </Button>
        )}
        {isActiveStep(3) ? (
          <Button type="submit" colorScheme="primary">
            가입하기
          </Button>
        ) : (
          <Button
            key="noSubmit"
            type="button"
            onClick={handleNext}
            colorScheme="primary"
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
