import React from 'react';

import { Button, FormControl, HStack, Input, Text } from '@chakra-ui/react';

const SignUp = function () {
  return (
    <FormControl>
      <HStack>
        <Text>병원 검색 : </Text>
        <Input />
        <Button>검색</Button>
      </HStack>
    </FormControl>
  );
};

export default SignUp;
