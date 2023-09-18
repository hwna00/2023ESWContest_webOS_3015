import { useCallback } from 'react';

import { Link as ReactRouterLink } from 'react-router-dom';
import {
  Link as ChakraLink,
  Flex,
  Heading,
  Button,
  VStack,
} from '@chakra-ui/react';

function NotFound() {
  const goPrev = useCallback(() => {
    window.history.back();
  }, []);

  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      minH="100vh"
      bgColor="#f0f0f0"
    >
      <Heading as="h1" fontSize="3rem" mb="2rem" color="black">
        404 Not Found
      </Heading>
      <Heading as="h2" fontSize="1.5rem" mb="1rem" color="black">
        페이지를 찾을 수 없습니다.
      </Heading>

      <VStack spacing={4} align="center">
        <ChakraLink as={ReactRouterLink} onClick={goPrev}>
          <Button colorScheme="primary">이전 페이지로</Button>
        </ChakraLink>
        <ChakraLink as={ReactRouterLink} to="/">
          <Button colorScheme="primary">메인 페이지로</Button>
        </ChakraLink>
      </VStack>
    </Flex>
  );
}

export default NotFound;
