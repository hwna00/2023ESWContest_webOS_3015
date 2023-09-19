import { useCallback, useState } from 'react';

import { useNavigate, Link as ReactRouterLink } from 'react-router-dom';
import { FaUserAlt, FaLock } from 'react-icons/fa';
import { AiFillGoogleCircle, AiFillTwitterCircle } from 'react-icons/ai';
import { useForm } from 'react-hook-form';
import {
  Box,
  Flex,
  Heading,
  Input,
  Button,
  InputGroup,
  Stack,
  InputLeftElement,
  FormControl,
  InputRightElement,
  HStack,
  Link as ChakraLink,
  FormErrorMessage,
  Icon,
} from '@chakra-ui/react';

import { logIn, googleLogin, auth, provider } from '../../../../firebase';
import NaverLoginButton from '../../../components/NaverLoginButton/NaverLoginButton';

function LogIn() {
  const [showPassword, setShowPassword] = useState(false);
  const handleShowClick = useCallback(() => {
    setShowPassword(!showPassword);
  }, [showPassword]);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = function (data) {
    const { email, password } = data;
    logIn(email, password)
      .then(() => {
        navigate('/');
      })
      .catch(error => {
        console.log(error);
        navigate('/error');
      });
  };

  const googleClick = useCallback(() => {
    googleLogin(auth, provider)
      .then(result => {
        console.log(result);
        navigate('/');
      })
      .catch(error => {
        console.log(error);
        navigate('/error');
      });
  }, [navigate]);

  return (
    <Flex
      flexDirection="column"
      width="100wh"
      height="100vh"
      backgroundColor="gray.200"
      justifyContent="center"
      alignItems="center"
    >
      <HStack wrap="wrap" alignItems="center">
        <Flex flexDirection="column" alignItems="flex-start" marginRight="8rem">
          <Heading as="h1" fontSize="3rem" mb="2rem" color="black">
            Housepital
          </Heading>
          <Heading
            as="h3"
            fontSize="1rem"
            mb="1rem"
            color="black"
            fontWeight="500"
          >
            건강 데이터 기록부터 의사와의 원격 상담까지, <br />
            간편하고 안전한 건강 관리 서비스에 가입해보세요.
          </Heading>
        </Flex>
        <Stack
          flexDir="column"
          mb="2"
          justifyContent="center"
          alignItems="center"
        >
          <Box as="form" onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={6} p="3rem" backgroundColor="white" boxShadow="md">
              <HStack
                justifyContent="center"
                alignItems="center"
                padding="15px"
              >
                <NaverLoginButton />

                <Button bgColor="white" onClick={googleClick}>
                  <Icon as={AiFillGoogleCircle} boxSize="30px" />
                </Button>
                <Button bgColor="white">
                  <Icon as={AiFillTwitterCircle} boxSize="30px" />
                </Button>
              </HStack>

              <FormControl isInvalid={errors.email}>
                <InputGroup>
                  <InputLeftElement pointerEvents="none">
                    <Icon as={FaUserAlt} boxSize="20px" color="gray.300" />
                  </InputLeftElement>
                  <Input
                    required
                    name="email"
                    type="email"
                    placeholder="email"
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
                    placeholder="Password"
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
                    <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                      {showPassword ? 'Hide' : 'Show'}
                    </Button>
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
                Login
              </Button>
              <ChakraLink as={ReactRouterLink} to="/auth/sign-up">
                <Button
                  borderRadius={8}
                  type="button"
                  variant="outline"
                  colorScheme="primary"
                  width="full"
                >
                  Sign Up
                </Button>
              </ChakraLink>
              <ChakraLink
                as={ReactRouterLink}
                color="primary.500"
                href="#"
                textDecoration="underline"
                textAlign="center"
                to="/find-pw"
              >
                비밀번호를 잊어버리셨나요?
              </ChakraLink>
            </Stack>
          </Box>
        </Stack>
      </HStack>
    </Flex>
  );
}

export default LogIn;
