/* eslint-disable */
import { useCallback, useEffect, useRef, useState } from 'react';

import { io } from 'socket.io-client';
import { Button, HStack, VStack } from '@chakra-ui/react';

let myStream;
const roomName = 'myRoom';

const VideoCall = function () {
  const socketRef = useRef();
  const myVideoRef = useRef();
  const patientFace = useRef();
  const peerConnectionRef = useRef();

  const getMedia = async () => {
    console.log('get media');
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
    console.log('create Offer');
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
    console.log('createAnswer');
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
    console.log('make connection');
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
      console.log('on icecandidate');
      if (data.candidate) {
        if (!socketRef.current) {
          return;
        }
        console.log('recv candidate');
        socketRef.current.emit('ice', data.candidate, roomName);
      }
    });

    peerConnectionRef.current.addEventListener('track', data => {
      if (patientFace.current) {
        console.log('track', data);
        patientFace.current.srcObject = data.streams[0];
      }
    });

    console.log('mystream', myStream);
    myStream
      ?.getTracks()
      .forEach(track => peerConnectionRef.current.addTrack(track, myStream));
  };

  const initCall = async () => {
    console.log('1');
    await getMedia();
    console.log('2');
    makeConnection();
    console.log('3');
  };

  const onRTCStart = async () => {
    console.log('before init call');
    await initCall();
    console.log('after init call');
    socketRef.current.emit('join_room', roomName);
  };

  useEffect(() => {
    socketRef.current = io('localhost:3000', {
      transports: ['websocket'],
    });

    socketRef.current.on('welcome', async () => {
      console.log('welcome!');
      await createOffer();
    });

    socketRef.current.on('offer', async offer => {
      console.log('recv Offer');
      await createAnswer(offer);
    });

    socketRef.current.on('answer', async answer => {
      console.log('recv Answer', answer);
      if (!peerConnectionRef.current) {
        return;
      }
      peerConnectionRef.current.setRemoteDescription(answer);
      console.log('set remote', peerConnectionRef.current);
    });

    socketRef.current.on('ice', async candidate => {
      if (!peerConnectionRef.current) {
        return;
      }
      console.log('received candidate', candidate);
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
    // TODO: 예약 상태를 진찰 완료로 변경하고 다음 페이지로 넘어가기
  }, []);

  return (
    <VStack>
      <HStack justifyContent="center" alignItems="center">
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
        />

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
        />
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
      </HStack>
    </VStack>
  );
};

export default VideoCall;
