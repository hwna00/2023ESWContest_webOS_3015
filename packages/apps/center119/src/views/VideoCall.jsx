import { useCallback, useEffect, useRef } from 'react';

import { io } from 'socket.io-client';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, HStack } from '@chakra-ui/react';

let myStream;
const roomName = 'myRoom';

const VideoCall = function ({ patientId }) {
  const socketRef = useRef();
  const myVideoRef = useRef();
  const patientFace = useRef();
  const peerConnectionRef = useRef();
  const { id: emergencyId } = useParams();

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
    socketRef.current = io(`${process.env.REACT_APP_BACKEND_API}`);

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

    socketRef.current.emit('emergency_ready', patientId, emergencyId);

    onRTCStart();

    return () => {
      socketRef.current.emit('emergency_end', roomName);

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
  }, [emergencyId, patientId]);

  return (
    <HStack width="full" justifyContent="center" alignItems="center">
      <video
        className="myFace"
        style={{
          flex: 1,
        }}
        ref={myVideoRef}
        autoPlay
      >
        <track kind="captions" />
      </video>
      <video
        className="patientFace"
        style={{
          flex: 1,
        }}
        ref={patientFace}
        autoPlay
      >
        <track kind="captions" />
      </video>
    </HStack>
  );
};

export default VideoCall;
