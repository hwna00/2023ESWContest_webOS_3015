import { useState } from 'react';
import { Link as ReactRouterLink } from 'react-router-dom';
import {
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
} from '@chakra-ui/react';
import { FaUserAlt, FaLock } from 'react-icons/fa';
import {
  AiFillGithub,
  AiFillGoogleCircle,
  AiFillTwitterCircle,
} from 'react-icons/ai';

//icon들
const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);
const GitHub = chakra(AiFillGithub);
const Google = chakra(AiFillGoogleCircle);
const Twitter = chakra(AiFillTwitterCircle);

function LogInPage() {
  const [showPassword, setShowPassword] = useState(false); //비번 보여주기
  const handleShowClick = () => setShowPassword(!showPassword);
  return (
    <Flex
      flexDirection="column"
      width="100wh"
      height="100vh"
      backgroundColor="gray.200"
      justifyContent="center"
      alignItems="center"
    >
      <Flex direction="row" wrap="wrap" alignItems="center">
        <Flex flexDirection="column" alignItems="flex-start" marginRight="8rem">
          <Heading
            as="h1"
            fontSize="3rem"
            mb="2rem"
            color="#333"
            fontWeight="500"
          >
            Housepital
          </Heading>
          <Heading as="h3" fontSize="1rem" mb="1rem" color="#333">
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
          <form>
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
                <GitHub boxSize="30px" />
                <Google boxSize="30px" />
                <Twitter boxSize="30px" />
              </HStack>
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<CFaUserAlt color="gray.300" />}
                  />
                  <Input type="text" placeholder="id" />
                </InputGroup>
              </FormControl>
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    color="gray.300"
                    children={<CFaLock color="gray.300" />}
                  />
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Password"
                  />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                      {showPassword ? 'Hide' : 'Show'}
                    </Button>
                  </InputRightElement>
                </InputGroup>
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
                {/* 회원가입페이지로 넘어가기 */}
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
                {/* 비번 찾기 */}
                비밀번호를 잊어버리셨나요?
              </ChakraLink>
            </Stack>
          </form>
        </Stack>
      </Flex>
    </Flex>
  );
}

export default LogInPage;
