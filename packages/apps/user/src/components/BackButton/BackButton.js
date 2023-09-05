import { useCallback } from 'react';
import { HStack, Heading } from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';

function BackButton({ title }) {
  const goPrev = useCallback(() => {
    window.history.back();
  }, []);

  return (
    <HStack>
      <ArrowBackIcon boxSize="10" onClick={goPrev} />
      {title && (
        <Heading
          as="h2"
          fontSize="3xl"
          mb="4"
          color="black"
          fontWeight="500"
          textAlign="center"
        >
          {title}
        </Heading>
      )}
    </HStack>
  );
}

export default BackButton;
