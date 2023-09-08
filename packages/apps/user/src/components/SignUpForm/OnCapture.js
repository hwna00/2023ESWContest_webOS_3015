import { AspectRatio, Button, HStack } from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setImg } from '../../store';

const OnCapture = function () {
  const dispatch = useDispatch();

  const [error, setError] = useState();
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const navigate = useNavigate();

  const fetchStream = async () => {
    const devices = await window.navigator.mediaDevices.enumerateDevices();
    const cameras = devices.filter(device => device.kind === 'videoinput');

    try {
      const devicdId = cameras[1].deviceId;

      const cameraContraints = {
        audio: true,
        video: {
          deviceId: { exact: devicdId },
        },
      };

      const myStream = await window.navigator.mediaDevices.getUserMedia(
        cameraContraints,
      );
      if (videoRef?.current) {
        videoRef.current.srcObject = myStream;
      }
    } catch (err) {
      setError(err);
    }
  };

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

    canvas.setAttribute('width', 0);
    canvas.setAttribute('height', 0);

    return data;
  };

  const handleClick = async () => {
    const profileImg = captureCam();
    dispatch(setImg(profileImg));
    navigate('/auth/sign-up/after-capture', { state: { profileImg } });
  };

  useEffect(() => {
    fetchStream();
  }, []);

  useEffect(() => {
    if (error) {
      navigate('/error');
    }
  }, [error, navigate]);

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

      {/* eslint-disable */}
      <Button colorScheme={'primary'} onClick={handleClick}>
        사진 찍기
      </Button>
      <canvas ref={canvasRef} height={0} width={0} />
    </HStack>
  );
};

export default OnCapture;
