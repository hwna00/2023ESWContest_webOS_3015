import { Container, Spinner, VStack } from '@chakra-ui/react';

const LoadingPage = () => {
  return (
    <Container
      width={'100vh'}
      height={'100vh'}
      display={'flex'}
      justifyContent={'center'}
      alignItems={'center'}
    >
      <Spinner
        emptyColor="primary.200"
        color="primary.500"
        size="xl"
        speed="1s"
        thickness="6px"
      />
    </Container>
  );
};

export default LoadingPage;
