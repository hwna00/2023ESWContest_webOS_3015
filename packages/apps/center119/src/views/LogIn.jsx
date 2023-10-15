import { useCallback, useState } from 'react';

import { useNavigate, Link as ReactRouterLink } from 'react-router-dom';
import { FaUserAlt, FaLock, FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
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
  VStack,
} from '@chakra-ui/react';

import { fbLogIn } from '../firebase';
import { useDispatch } from 'react-redux';
import { getCounselor } from '../api';
import { setCounselor } from '../store';

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
      const counselorId = await fbLogIn(data);
      const counselor = await getCounselor(counselorId);
      dispatch(setCounselor(counselor));
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
      <HStack wrap="wrap" alignItems="counselor">
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
        <VStack
          padding={'12'}
          justifyContent="center"
          alignItems="center"
          backgroundColor="white"
          boxShadow="md"
        >
          <Box as="form" onSubmit={handleSubmit(onSubmit)} mb={'4'}>
            <Stack gap={'4'}>
              <HStack
                justifyContent="center"
                alignItems="center"
                padding="15px"
              ></HStack>
              <Heading fontSize="22px">LogIn for Counselor 119</Heading>
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
            </Stack>
          </Box>
          <VStack width={'full'}>
            <ChakraLink as={ReactRouterLink} to="/auth/sign-up" width={'full'}>
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
            <ChakraLink
              as={ReactRouterLink}
              color="primary.500"
              href="#"
              textDecoration="underline"
              textAlign="counselor"
              to="/find-pw"
            >
              비밀번호를 잊어버리셨나요?
            </ChakraLink>
          </VStack>
        </VStack>
      </HStack>
    </Flex>
  );
}

export default LogIn;
