import { AspectRatio, Avatar, Button, HStack, Image } from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';

const BeforeCapture = function ({ openCam }) {
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

      <Button colorScheme={'primary'} onClick={openCam}>
        프로필 사진 추가
      </Button>
    </HStack>
  );
};

const OnCapture = function ({ videoRef, captureCam }) {
  return (
    <HStack width={'full'} justifyContent={'space-evenly'}>
      <AspectRatio
        width={'xs'}
        ratio={1}
        borderRadius={'full'}
        overflow={'hidden'}
      >
        <video autoPlay ref={videoRef} />
      </AspectRatio>

      <Button colorScheme={'primary'} onClick={captureCam}>
        사진 찍기
      </Button>
    </HStack>
  );
};

const AfterCapture = function ({ imgRef, profileImg }) {
  return (
    <HStack width={'full'} justifyContent={'space-evenly'}>
      <AspectRatio
        width={'xs'}
        ratio={1}
        borderRadius={'full'}
        overflow={'hidden'}
      >
        <Image ref={imgRef} src={profileImg} />
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

const UserFase = function () {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const imgRef = useRef(null);

  const [isCamOpen, setIsCamOpen] = useState(false);
  const [profileImg, setProfileImg] = useState(null);
  const [streamLoading, setStreamLoading] = useState();

  const fetchStream = async () => {
    setStreamLoading(true);
    const myStream = await window.navigator.mediaDevices.getUserMedia({
      audio: true,
      video: {
        deviceId: {
          exact:
            '61c8194295392492c4593e5a4f512c94edaa5e26036227180aca9c2fff72ed5e',
        },
      },
    });
    setStreamLoading(false);

    if (videoRef?.current) {
      videoRef.current.srcObject = myStream;
    }
  };

  useEffect(() => {
    if (isCamOpen) {
      fetchStream();
    } else {
      const stream = videoRef.current?.srcObject;
      if (stream) {
        stream.getVideoTracks()[0].stop();
      }
    }
  }, [isCamOpen]);

  const openCam = async () => {
    setIsCamOpen(true);
  };

  // const clearProfileImg = () => {
  //   setProfileImg(null);
  // };

  const captureCam = () => {
    const video = videoRef.current;

    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    const width = videoRef.current?.offsetWidth;
    const height = videoRef.current?.offsetHeight;
    canvas.setAttribute('width', width);
    canvas.setAttribute('height', height);

    context.drawImage(video, 0, 0, width, height);

    const data = canvas.toDataURL('image/png');
    setProfileImg(data);

    canvas.setAttribute('width', 0);
    canvas.setAttribute('height', 0);
  };

  return (
    <>
      {!isCamOpen ? (
        <BeforeCapture openCam={openCam} />
      ) : !profileImg ? (
        <OnCapture videoRef={videoRef} captureCam={captureCam} />
      ) : (
        <AfterCapture imgRef={imgRef} profileImg={profileImg} />
      )}
      <canvas ref={canvasRef} height={0} />
    </>
  );
};

export default UserFase;
