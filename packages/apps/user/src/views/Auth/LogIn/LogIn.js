import { useCallback, useState } from 'react';

import { useNavigate, Link as ReactRouterLink } from 'react-router-dom';
import { FaUserAlt } from '@react-icons/all-files/fa/FaUserAlt';
import { FaLock } from '@react-icons/all-files/fa/FaLock';
import { FaRegEye } from '@react-icons/all-files/fa/FaRegEye';
import { FaRegEyeSlash } from '@react-icons/all-files/fa/FaRegEyeSlash';
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

import KakaoLoginButton from '../../../components/KakaoLoginButton/KakaoLoginButton';
import NaverLoginButton from '../../../components/NaverLoginButton/NaverLoginButton';
import { fbEmailLogIn } from '../../../../firebase';
import useCreateToast from '@housepital/common/hooks/useCreateToast';

function LogIn() {
  const [showPassword, setShowPassword] = useState(false);
  const handleShowClick = useCallback(() => {
    setShowPassword(!showPassword);
  }, [showPassword]);

  const navigate = useNavigate();
  const toast = useCreateToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = function (data) {
    fbEmailLogIn(data).then(user => {
      if (user) {
        navigate('/');
      } else {
        toast('존재하지 않는 사용자입니다. ');
      }
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
              >
                <NaverLoginButton />
                <KakaoLoginButton />
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
              textAlign="center"
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
