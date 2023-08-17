import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Link as ReactRouterLink } from 'react-router-dom';
import {
  Box,
  Flex,
  Heading,
  Input,
  Button,
  InputGroup,
  Stack,
  InputLeftElement,
  chakra,
  FormControl,
  InputRightElement,
  HStack,
  Link as ChakraLink,
  FormErrorMessage,
  Icon,
} from '@chakra-ui/react';
import { FaUserAlt, FaLock } from 'react-icons/fa';
import { logIn, googleLogin, auth, provider } from '../../../firebase';
import {
  AiFillGithub,
  AiFillGoogleCircle,
  AiFillTwitterCircle,
} from 'react-icons/ai';

function LogIn() {
  const [showPassword, setShowPassword] = useState(false);
  const handleShowClick = () => setShowPassword(!showPassword);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = function (data) {
    const { email, password } = data;
    logIn(email, password)
      .then(userCredential => {
        navigate('/');
      })
      .catch(error => {
        console.log(error);
        navigate('/error');
      });
  };
  const googleClick = function () {
    googleLogin(auth, provider)
      .then(result => {
        console.log(result);
        navigate('/');
      })
      .catch(error => {
        console.log(error);
        navigate('/error');
      });
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
      <HStack wrap="wrap" alignItems="center">
        <Flex flexDirection="column" alignItems="flex-start" marginRight="8rem">
          <Heading as="h1" fontSize="3rem" mb="2rem" color="#333">
            Housepital
          </Heading>
          <Heading
            as="h3"
            fontSize="1rem"
            mb="1rem"
            color="#333"
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
          <Box as={'form'} onSubmit={handleSubmit(onSubmit)}>
            <Stack
              spacing={6}
              p="3rem"
              backgroundColor="whiteAlpha.900"
              boxShadow="md"
            >
              <HStack
                justifyContent="center"
                alignItems="center"
                padding="15px"
              >
                <Button bgColor="white">
                  <Icon as={AiFillGithub} boxSize="30px" />
                </Button>

                <Button bgColor="white" onClick={googleClick}>
                  <Icon as={AiFillGoogleCircle} boxSize="30px" />
                </Button>
                <Button bgColor="white">
                  <Icon as={AiFillTwitterCircle} boxSize="30px" />
                </Button>
              </HStack>
              <FormControl isInvalid={errors.email}>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={
                      <Icon as={FaUserAlt} boxSize="20px" color="gray.300" />
                    }
                  />
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
                  <InputLeftElement
                    pointerEvents="none"
                    color="gray.300"
                    children={
                      <Icon as={FaLock} boxSize="20px" color="gray.300" />
                    }
                  />
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
                colorScheme="blue"
                width="full"
              >
                Login
              </Button>
              <ChakraLink as={ReactRouterLink} to="/sign-up">
                <Button
                  borderRadius={8}
                  type="button"
                  variant="outline"
                  colorScheme="blue"
                  width="full"
                >
                  Sign Up
                </Button>
              </ChakraLink>
              <ChakraLink
                as={ReactRouterLink}
                color="blue.500"
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
