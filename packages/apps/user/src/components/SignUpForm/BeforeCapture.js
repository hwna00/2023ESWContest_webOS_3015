import {
  AspectRatio,
  Avatar,
  Button,
  HStack,
  Link as ChakraLink,
} from '@chakra-ui/react';
import { Link as ReactRouterLink } from 'react-router-dom';

const BeforeCapture = function () {
  return (
    <HStack width={'full'} justifyContent={'space-evenly'}>
      <AspectRatio
        width={'xs'}
        ratio={1}
        borderRadius={'full'}
        overflow={'hidden'}
      >
        <Avatar />
      </AspectRatio>

      <ChakraLink as={ReactRouterLink} to={'/auth/sign-up/on-capture'}>
        <Button colorScheme={'primary'}>프로필 사진 추가</Button>
      </ChakraLink>
    </HStack>
  );
};

export default BeforeCapture;
