import { AspectRatio, HStack } from '@chakra-ui/react';
import { useLocation } from 'react-router-dom';

const AfterCapture = function () {
  const location = useLocation();
  const profileImg = location.state.profileImg;

  return (
    <HStack width={'full'} justifyContent={'space-evenly'}>
      <AspectRatio
        width={'xs'}
        ratio={1}
        borderRadius={'full'}
        overflow={'hidden'}
      >
        <input
          src={profileImg}
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
