import { Button, VStack } from '@chakra-ui/react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';

import { io } from 'socket.io-client';

const roomName = 'room';

const HealthManageDetail = function () {
  const socketRef = useRef();
  const [showStartBtn, setShowStartBtn] = useState(false);
  const { type } = useParams();

  const onStartClick = useCallback(() => {
    console.log('start clicked');
    socketRef.current.emit(`${type}_start`, roomName);
  }, [type]);

  useEffect(() => {
    socketRef.current = io('localhost:3000', { transports: ['websocket'] });

    socketRef.current.on('welcome', () => {
      setShowStartBtn(true);
    });

    socketRef.current.on(`${type}_start`, time => {
      // TODO: 측정 진행 시간을 data로 받아와야 함
      // TODO: 그 data를 기반으로 사용자에게 타이머를 띄운다.
      console.log('측정 시간: ', time);
    });

    socketRef.current.on(`${type}_end`, data => {
      console.log('result: ', data);
    });

    socketRef.current.emit('join_room', roomName);
  }, [type]);

  return (
    <VStack>
      {showStartBtn && <Button onClick={onStartClick}>측정 시작</Button>}
    </VStack>
  );
};

export default HealthManageDetail;
