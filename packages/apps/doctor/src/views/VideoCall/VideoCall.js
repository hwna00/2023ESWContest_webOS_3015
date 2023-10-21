import { useCallback, useEffect, useRef, useState } from 'react';

import { io } from 'socket.io-client';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import useCreateToast from '@housepital/common/hooks/useCreateToast';
import {
  Box,
  Button,
  ButtonGroup,
  HStack,
  Heading,
  Textarea,
  VStack,
} from '@chakra-ui/react';

import { createDiagnoses, updateAppointment } from '../../api';

let myStream;
const roomName = 'myRoom';

const VideoCall = function () {
  const [isInProcess, setIsInProcess] = useState(true);
  const socketRef = useRef();
  const myVideoRef = useRef();
  const patientFace = useRef();
  const peerConnectionRef = useRef();
  const { id: appointmentId } = useParams();

  const navigate = useNavigate();
  const { register, handleSubmit } = useForm({ mode: 'onChange' });
  const toast = useCreateToast();
  const getMedia = async () => {
    try {
      const stream = await window.navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });

      if (myVideoRef.current) {
        myVideoRef.current.srcObject = stream;
      }

      myStream = stream;
    } catch (e) {
      console.error(e);
    }
  };

  const createOffer = async () => {
    if (!(peerConnectionRef.current && socketRef.current)) {
      return;
    }
    try {
      const offer = await peerConnectionRef.current.createOffer();

      peerConnectionRef.current.setLocalDescription(offer);
      socketRef.current.emit('offer', offer, roomName);
    } catch (e) {
      console.error(e);
    }
  };

  const createAnswer = async offer => {
    if (!(peerConnectionRef.current && socketRef.current)) {
      return;
    }

    try {
      peerConnectionRef.current.setRemoteDescription(offer);
      const answer = await peerConnectionRef.current.createAnswer();
      peerConnectionRef.current.setLocalDescription(answer);
      socketRef.current.emit('answer', answer, roomName);
    } catch (e) {
      console.error(e);
    }
  };

  const makeConnection = async () => {
    peerConnectionRef.current = new window.RTCPeerConnection({
      iceServers: [
        { urls: ['stun:ntk-turn-1.xirsys.com'] },
        {
          username: process.env.REACT_APP_STUN_USERNAME,
          credential: process.env.REACT_APP_STUN_CREDENTIAL,
          urls: [
            'turn:ntk-turn-1.xirsys.com:80?transport=udp',
            'turn:ntk-turn-1.xirsys.com:3478?transport=udp',
            'turn:ntk-turn-1.xirsys.com:80?transport=tcp',
            'turn:ntk-turn-1.xirsys.com:3478?transport=tcp',
            'turns:ntk-turn-1.xirsys.com:443?transport=tcp',
            'turns:ntk-turn-1.xirsys.com:5349?transport=tcp',
          ],
        },
      ],
    });

    peerConnectionRef.current.addEventListener('icecandidate', data => {
      if (data.candidate) {
        if (!socketRef.current) {
          return;
        }
        socketRef.current.emit('ice', data.candidate, roomName);
      }
    });

    peerConnectionRef.current.addEventListener('track', data => {
      if (patientFace.current) {
        [patientFace.current.srcObject] = data.streams;
      }
    });

    myStream
      ?.getTracks()
      .forEach(track => peerConnectionRef.current.addTrack(track, myStream));
  };

  const initCall = async () => {
    await getMedia();
    makeConnection();
  };

  const onRTCStart = async () => {
    await initCall();
    socketRef.current.emit('join_room', roomName);
  };

  useEffect(() => {
    socketRef.current = io(`${process.env.REACT_APP_BACKEND_API}`, {
      transports: ['websocket'],
    });

    socketRef.current.on('welcome', async () => {
      await createOffer();
    });

    socketRef.current.on('offer', async offer => {
      await createAnswer(offer);
    });

    socketRef.current.on('answer', async answer => {
      if (!peerConnectionRef.current) {
        return;
      }
      peerConnectionRef.current.setRemoteDescription(answer);
    });

    socketRef.current.on('ice', async candidate => {
      if (!peerConnectionRef.current) {
        return;
      }
      peerConnectionRef.current.addIceCandidate(candidate);
    });

    onRTCStart();

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
      if (peerConnectionRef.current?.readyState === 1) {
        peerConnectionRef.current.close();
      }
      myStream?.getTracks().forEach(track => {
        track.stop();
      });
    };
  }, []);

  const onTrmtDoneClick = useCallback(() => {
    socketRef.current.emit('trmt_pending', roomName);
    patientFace.current.srcObject = null;
    setIsInProcess(false);
  }, []);

  const onSubmit = async data => {
    const { content } = data;

    try {
      await createDiagnoses(appointmentId, content);
      await updateAppointment(appointmentId);

      socketRef.current.emit('trmt_end', roomName);

      navigate('/');
    } catch (error) {
      toast(error.message);
    }
  };

  return (
    <VStack>
      <HStack
        justifyContent="center"
        alignItems="center"
        width="100vw"
        height="100vh"
        position="absolute"
        top="0px"
        left="0px"
        zIndex="998"
        bgColor="white"
      >
        {isInProcess ? (
          <>
            <video
              className="myFace"
              style={{
                height: '100vh',
                position: 'absolute',
                top: '0px',
                left: '0px',
                zIndex: '999',
                backgroundColor: 'white',
              }}
              ref={myVideoRef}
              autoPlay
            >
              <track kind="captions" />
            </video>
            <video
              className="patientFace"
              style={{
                width: '250px',
                position: 'absolute',
                top: '0px',
                right: '0px',
                zIndex: '9999',
                backgroundColor: 'transparent',
                borderBottomLeftRadius: '16px',
              }}
              ref={patientFace}
              autoPlay
            >
              <track kind="captions" />
            </video>

            <Button
              colorScheme="red"
              variant="outline"
              position="absolute"
              bottom="4"
              right="4"
              zIndex={1000}
              onClick={onTrmtDoneClick}
            >
              진료 종료
            </Button>
          </>
        ) : (
          <Box position="absolute" zIndex={1001}>
            <Heading>전달사항</Heading>
            <VStack
              as="form"
              alignItems="flex-end"
              onSubmit={handleSubmit(onSubmit)}
              gap="4"
              mt="4"
            >
              <Textarea width="lg" {...register('content')} />
              <ButtonGroup>
                <Button type="submit" colorScheme="primary">
                  완료하기
                </Button>
              </ButtonGroup>
            </VStack>
          </Box>
        )}
      </HStack>
    </VStack>
  );
};

export default VideoCall;
