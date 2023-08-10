import { Flex, Heading, Stack, Button } from '@chakra-ui/react';
import { Link as ReactRouterLink } from 'react-router-dom';

function NotFound() {
  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      minH="100vh"
      bgColor="#f0f0f0"
    >
      <Heading as="h1" fontSize="3rem" mb="2rem" color="#333">
        404 Not Found
      </Heading>
      <Heading as="h2" fontSize="1.5rem" mb="1rem" color="#333">
        페이지를 찾을 수 없습니다.
      </Heading>

      <Stack direction="row" spacing={4} align="center">
        <ReactRouterLink to="">
          <Button colorScheme="blue">이전 페이지로</Button>
        </ReactRouterLink>
        <ReactRouterLink to="/">
          <Button colorScheme="blue">메인 페이지로</Button>
        </ReactRouterLink>
      </Stack>
    </Flex>
  );
}

export default NotFound;
