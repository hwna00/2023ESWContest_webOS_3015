import { Link as ReactRouterLink } from 'react-router-dom';
import {
  Link as ChakraLink,
  Flex,
  Heading,
  Stack,
  Button,
} from '@chakra-ui/react';

function ErrorPage() {
  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      minH="100vh"
      bgColor="#f0f0f0"
    >
      <Heading as="h1" fontSize="3rem" mb="2rem" color="#333">
        500 Server Error
      </Heading>
      <Heading as="h2" fontSize="1.5rem" mb="1rem" color="#333">
        서버에 에러가 발생하였습니다. 잠시 후 다시 시도해주세요.
      </Heading>

      <Stack direction="row" spacing={4} align="center">
        <ChakraLink as={ReactRouterLink} onClick={() => window.history.back()}>
          <Button colorScheme="primary">이전 페이지로</Button>
        </ChakraLink>
        <ChakraLink as={ReactRouterLink} to="/">
          <Button colorScheme="primary">메인 페이지로</Button>
        </ChakraLink>
      </Stack>
    </Flex>
  );
}

export default ErrorPage;
