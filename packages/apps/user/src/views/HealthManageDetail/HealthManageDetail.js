import { useCallback, useEffect, useRef, useState } from 'react';

import { useParams } from 'react-router-dom';
import {
  Button,
  HStack,
  Heading,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Progress,
  VStack,
} from '@chakra-ui/react';
import { io } from 'socket.io-client';
import { ResponsiveLine } from '@nivo/line';

const roomName = 'room';

const HealthManageDetail = function () {
  const socketRef = useRef();
  const [showStartBtn, setShowStartBtn] = useState(false);
  const [data, setData] = useState();
  const [timer, setTimer] = useState({
    isValid: false,
    time: 0,
  });

  // TODO: 현재까지의 건강 기록 정보를 받아오는 api 함수 추가

  const { type } = useParams();

  const onStartClick = useCallback(() => {
    socketRef.current.emit(`${type}_start`, roomName);
  }, [type]);

  useEffect(() => {
    socketRef.current = io('localhost:3000', { transports: ['websocket'] });

    socketRef.current.on('welcome', () => {
      setShowStartBtn(true);
      console.log('welcome');
    });

    socketRef.current.on('setup_senser', () => {
      setShowStartBtn(true);
    });

    socketRef.current.on(`${type}_start`, time => {
      setTimer({
        isValid: true,
        time: time,
      });
    });

    socketRef.current.on(`${type}_end`, measured => {
      console.log(`${type}_end`);
      console.log('result: ', measured);
      setData(measured);
    });

    socketRef.current.emit('join_room', roomName);

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, [type]);

  useEffect(() => {
    let measureTimer;
    if (timer.isValid) {
      measureTimer = setInterval(() => {
        setTimer(prev => ({
          isValid: prev.isValid,
          time: prev.time - 1,
        }));
      }, 1000);

      if (timer.time === 0) {
        setTimer({
          isValid: false,
          time: 0,
        });
        clearInterval(measureTimer);
      }
    }
    return () => clearInterval(measureTimer);
  }, [timer]);

  const temp = [
    {
      id: '심박수',
      color: 'hsl(190, 70%, 50%)',
      data: [
        {
          x: '2023-10-10',
          y: 112,
        },
        {
          x: '2023-10-11',
          y: 150,
        },
        {
          x: '2023-10-12',
          y: 137,
        },
        {
          x: '2023-10-13',
          y: 110,
        },
        {
          x: '2023-10-14',
          y: 89,
        },
      ],
    },
  ];

  return (
    <VStack height="full">
      <HStack width="full" justifyContent="space-between" alignItems="center">
        <Heading>그래프</Heading>
        <Button
          colorScheme="primary"
          size="lg"
          isLoading={showStartBtn}
          loadingText="측정 준비"
          spinnerPlacement="end"
          onClick={onStartClick}
        >
          측정 시작
        </Button>
      </HStack>
      <ResponsiveLine
        data={temp}
        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
        xScale={{ type: 'point' }}
        yScale={{
          type: 'linear',
          min: 'auto',
          max: 'auto',
          stacked: true,
          reverse: false,
        }}
        yFormat=" >-.2f"
        curve="natural"
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
        }}
        lineWidth={4}
        pointSize={10}
        pointColor={{ theme: 'background' }}
        pointBorderWidth={2}
        pointBorderColor={{ from: 'serieColor' }}
        pointLabelYOffset={-12}
        useMesh
        legends={[
          {
            anchor: 'bottom-right',
            direction: 'column',
            justify: false,
            translateX: 100,
            translateY: 0,
            itemsSpacing: 0,
            itemDirection: 'left-to-right',
            itemWidth: 80,
            itemHeight: 20,
            itemOpacity: 0.75,
            symbolSize: 12,
            symbolShape: 'circle',
            symbolBorderColor: 'rgba(0, 0, 0, .5)',
            effects: [
              {
                on: 'hover',
                style: {
                  itemBackground: 'rgba(0, 0, 0, .03)',
                  itemOpacity: 1,
                },
              },
            ],
          },
        ]}
      />

      <Modal isOpen={timer.isValid}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>측정 중입니다.</ModalHeader>
          <ModalBody fontSize="xl" fontWeight="bold" textAlign="center">
            {timer.time}
            <Progress
              mt="8"
              colorScheme="primary"
              size="md"
              borderRadius="md"
              isIndeterminate
            />
          </ModalBody>
          <ModalFooter />
        </ModalContent>
      </Modal>
    </VStack>
  );
};

export default HealthManageDetail;
