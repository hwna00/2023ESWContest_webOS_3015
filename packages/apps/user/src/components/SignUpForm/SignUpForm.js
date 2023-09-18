import { useCallback, useEffect } from 'react';

import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types';
import { ref, uploadBytes } from 'firebase/storage';
import { motion } from 'framer-motion';
import {
  browserLocalPersistence,
  setPersistence,
  updateProfile,
} from 'firebase/auth';
import { Box, Button, ButtonGroup, VStack } from '@chakra-ui/react';

import { auth, signIn } from '../../../firebase';
import { storage } from '../../../firebase';
import { setErrors } from '../../store';

const SignUpForm = function ({
  activeStep,
  goToNext,
  goToPrevious,
  isActiveStep,
  isCompleteStep,
}) {
  const navigate = useNavigate();
  const reactHookForm = useForm({ mode: 'all' });
  const dispatch = useDispatch();
  const profileImgBlob = useSelector(state => state.signUp.blob);

  useEffect(() => {
    const errors = reactHookForm.formState.errors;

    const filteredErrors = {};
    Object.entries(errors).map(([key, value]) => {
      filteredErrors[key] = { message: value.message };
    });

    dispatch(setErrors(filteredErrors));
  }, [dispatch, reactHookForm.formState]);

  const handleNext = useCallback(async () => {
    const isFullfilled = await reactHookForm.trigger();

    if (isFullfilled) {
      navigate(`/auth/sign-up/step${activeStep + 2}`);
      goToNext();
    }
  }, [activeStep, goToNext, navigate, reactHookForm]);

  const handlePrev = useCallback(() => {
    navigate(`/auth/sign-up/step${activeStep}`);
    goToPrevious();
  }, [goToPrevious, activeStep, navigate]);

  const uploadBlob = blob => {
    const storageRef = ref(storage, 'images/' + new Date().getTime() + '.png');

    uploadBytes(storageRef, blob).catch(() => {
      navigate('/error');
    });
  };

  const onSubmit = function (data) {
    uploadBlob(profileImgBlob);
    navigate('/');

    //Todo: firebase로부터 받아온 토큰을 DB에 저장하기
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

  const location = useLocation();

  return (
    <VStack
      as="form"
      onSubmit={reactHookForm.handleSubmit(onSubmit)}
      alignItems="flex-end"
      gap="4"
      width="full"
      overflowY="scroll"
    >
      <Box
        key={location.pathname}
        width={'full'}
        as={motion.div}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1.0 }}
      >
        <Outlet context={reactHookForm} />
      </Box>

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
