/* eslint-disable */
import { useCallback, useEffect, useRef } from 'react';

import { io } from 'socket.io-client';
import { Button, HStack, VStack } from '@chakra-ui/react';
import LoadingPage from '@housepital/common/LoadingPage';
import { useNavigate, useParams } from 'react-router-dom';

const roomName = 'myRoom';

const VideoCall = function () {
  let myStream;

  const socketRef = useRef();
  const myVideoRef = useRef();
  const doctorVideoRef = useRef();
  const peerConnectionRef = useRef();

  const navigate = useNavigate();
  const { appointmentId } = useParams();

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
      console.log('send offer', peerConnectionRef.current);
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
      if (doctorVideoRef.current) {
        doctorVideoRef.current.srcObject = data.streams[0];
      }
    });

    console.log('mystream', myStream);
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
    socketRef.current = io('localhost:3000', { transports: ['websocket'] });

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

    socketRef.current.on('trmt_end', () => {
      navigate(`/appointment/${appointmentId}/select-pharmacies`);
    });

    onRTCStart();

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
      if (peerConnectionRef.current?.readyState === 1) {
        peerConnectionRef.current.close();
      }

      if (myStream) {
        myStream?.getTracks().forEach(track => {
          track.stop();
        });
      }
    };
  }, []);

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

        {doctorVideoRef.current?.srcObject ? (
          <video
            className="doctorFace"
            style={{
              width: '250px',
              position: 'absolute',
              top: '0px',
              right: '0px',
              zIndex: '9999',
              backgroundColor: 'transparent',
              borderBottomLeftRadius: '16px',
            }}
            ref={doctorVideoRef}
            autoPlay
          ></video>
        ) : (
          <LoadingPage />
        )}
        <video
          className="doctorFace"
          style={{
            width: '250px',
            position: 'absolute',
            top: '0px',
            right: '0px',
            zIndex: '9999',
            backgroundColor: 'transparent',
            borderBottomLeftRadius: '16px',
          }}
          ref={doctorVideoRef}
          autoPlay
        >
          <track kind="captions" />
        </video>
      </HStack>
    </VStack>
  );
};

export default VideoCall;
