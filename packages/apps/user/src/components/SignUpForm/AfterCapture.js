import { useSelector } from 'react-redux';
import { AspectRatio, HStack } from '@chakra-ui/react';


const AfterCapture = function () {
  const imgBlob = useSelector(state => state.signUp.blob);

  return (
    <HStack width="full" justifyContent="space-evenly">
      <AspectRatio width="xs" ratio={1} borderRadius="full" overflow="hidden">
        <input
          src={window.URL.createObjectURL(imgBlob)}
          accept="image/*"
          type="image"
          alt="profile image"
          disabled
        />
      </AspectRatio>
    </HStack>
  );
};

export default AfterCapture;
