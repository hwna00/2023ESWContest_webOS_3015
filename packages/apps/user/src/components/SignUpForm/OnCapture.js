import { useEffect, useRef } from 'react';

import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AspectRatio, Button, HStack, SkeletonCircle } from '@chakra-ui/react';

import { setImgBlob } from '../../store';
import useCamera from '../../hooks/useCamera';

const OnCapture = function () {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoading, stream, error } = useCamera();

  const captureCam = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    const width = videoRef.current?.offsetWidth;
    const height = videoRef.current?.offsetHeight;

    canvas.setAttribute('width', width);
    canvas.setAttribute('height', height);

    context.drawImage(video, 0, 0, width, height);

    canvas.toBlob(async blob => {
      dispatch(setImgBlob(blob));
      navigate('/auth/sign-up/step4/after-capture');
    });

    canvas.setAttribute('width', 0);
    canvas.setAttribute('height', 0);
  };

  useEffect(() => {
    if (videoRef?.current) {
      videoRef.current.srcObject = stream;
    }

    return () => {
      console.log('clean up', stream?.getTracks());

      stream?.getTracks().forEach(track => {
        track.stop();
      });
    };
  }, [videoRef, stream]);

  useEffect(() => {
    if (error) {
      navigate('/error');
    }
  }, [error]);

  return (
    <HStack width="full" justifyContent="space-evenly">
      {isLoading ? (
        <SkeletonCircle size={'80'} />
      ) : (
        <AspectRatio width="xs" ratio={1} borderRadius="full" overflow="hidden">
          <video autoPlay ref={videoRef} />
        </AspectRatio>
      )}

      {/* eslint-disable */}
      <Button colorScheme={'primary'} onClick={captureCam}>
        사진 찍기
      </Button>
      <canvas ref={canvasRef} height={0} width={0} />
    </HStack>
  );
};

export default OnCapture;
