import { Button, Stack } from '@chakra-ui/react';
import React from 'react';
import './NotFound.css';

function NotFound() {
  return (
    <div className="notfound">
      <h1>404 Not Found</h1>
      <Stack direction="row" spacing={4} align="center">
        <Button colorScheme="blue" onClick={() => window.history.back()}>
          이전 페이지로
        </Button>
        <Button colorScheme="blue" onClick={() => (window.location.href = '/')}>
          메인 페이지로
        </Button>
      </Stack>
    </div>
  );
}

export default NotFound;
