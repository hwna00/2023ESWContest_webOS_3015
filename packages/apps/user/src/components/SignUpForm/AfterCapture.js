import { AspectRatio, HStack, Image } from '@chakra-ui/react';
import { useRef } from 'react';
import { useLocation } from 'react-router-dom';

const AfterCapture = function () {
  const location = useLocation();
  console.log(location);
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

      {/* <Button
        variant={'outline'}
        colorScheme={'primary'}
        onClick={clearProfileImg}
      >
        다시 찍기
      </Button> */}
    </HStack>
  );
};

export default AfterCapture;
