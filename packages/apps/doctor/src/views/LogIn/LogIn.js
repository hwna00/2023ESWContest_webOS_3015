import { useCallback, useState } from 'react';

import { useNavigate, Link as ReactRouterLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { FaUserAlt } from '@react-icons/all-files/fa/FaUserAlt';
import { FaRegEyeSlash } from '@react-icons/all-files/fa/FaRegEyeSlash';
import { FaRegEye } from '@react-icons/all-files/fa/FaRegEye';
import { FaLock } from '@react-icons/all-files/fa/FaLock';
import {
  Flex,
  Heading,
  Input,
  Button,
  InputGroup,
  InputLeftElement,
  FormControl,
  InputRightElement,
  HStack,
  Link as ChakraLink,
  FormErrorMessage,
  Icon,
  VStack,
} from '@chakra-ui/react';

import { setDoctor } from '../../store';
import { getDoctor } from '../../api';
import { fbEmailLogIn } from '../../../firebase';

function LogIn() {
  const [showPassword, setShowPassword] = useState(false);
  const handleShowClick = useCallback(() => {
    setShowPassword(!showPassword);
  }, [showPassword]);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async function (data) {
    try {
      const doctorId = await fbEmailLogIn(data);
      const doctor = await getDoctor(doctorId);
      dispatch(setDoctor(doctor));
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Flex
      flexDirection="column"
      width="100wh"
      height="100vh"
      backgroundColor="gray.200"
      justifyContent="center"
      alignItems="center"
    >
      <HStack wrap="wrap" alignItems="center" gap="10">
        <Flex flexDirection="column" alignItems="flex-start">
          <Heading as="h1" fontSize="36" mb="8" color="black">
            의사를 위한 Housepital
          </Heading>
          <Heading
            as="h3"
            fontSize="1rem"
            mb="1rem"
            color="black"
            fontWeight="500"
          >
            수정 필요, <br />
            수정 필요
          </Heading>
        </Flex>
        <VStack
          padding="12"
          justifyContent="center"
          alignItems="center"
          backgroundColor="white"
          boxShadow="md"
        >
          <VStack as="form" onSubmit={handleSubmit(onSubmit)} mb="4" gap="4">
            <FormControl isInvalid={errors.email}>
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <Icon as={FaUserAlt} boxSize="20px" color="gray.300" />
                </InputLeftElement>
                <Input
                  required
                  name="email"
                  type="email"
                  placeholder="이메일"
                  {...register('email', {
                    required: '이 항목은 필수입니다.',
                    pattern: {
                      value:
                        /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i,
                      message: '이메일 형식이 아닙니다.',
                    },
                  })}
                />
              </InputGroup>
              <FormErrorMessage>{errors?.email?.message}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={errors.password}>
              <InputGroup>
                <InputLeftElement pointerEvents="none" color="gray.300">
                  <Icon as={FaLock} boxSize="20px" color="gray.300" />
                </InputLeftElement>
                <Input
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="비밀번호"
                  required
                  {...register('password', {
                    required: '이 항목은 필수입니다.',
                    minLength: {
                      value: 6,
                      message: '6자리 이상 입력해주세요.',
                    },
                  })}
                />
                <InputRightElement width="4.5rem">
                  <Icon
                    onClick={handleShowClick}
                    as={showPassword ? FaRegEye : FaRegEyeSlash}
                    boxSize={6}
                  />
                </InputRightElement>
              </InputGroup>
              <FormErrorMessage>{errors?.password?.message}</FormErrorMessage>
            </FormControl>
            <Button
              borderRadius={8}
              type="submit"
              variant="solid"
              colorScheme="primary"
              width="full"
            >
              로그인
            </Button>
          </VStack>
          <VStack width="full">
            <ChakraLink as={ReactRouterLink} to="/auth/sign-up" width="full">
              <Button
                borderRadius={8}
                type="button"
                variant="outline"
                colorScheme="primary"
                width="full"
              >
                회원가입
              </Button>
            </ChakraLink>
          </VStack>
        </VStack>
      </HStack>
    </Flex>
  );
}

export default LogIn;
