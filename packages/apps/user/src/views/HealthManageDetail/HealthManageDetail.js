import { useCallback, useEffect, useRef, useState } from 'react';

import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  Button,
  ButtonGroup,
  HStack,
  Heading,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Progress,
  Text,
  VStack,
  useDisclosure,
} from '@chakra-ui/react';
import { io } from 'socket.io-client';
import { ResponsiveLine } from '@nivo/line';
import useCreateToast from '@housepital/common/hooks/useCreateToast';

import { createVitalSign, getVitalSigns } from '../../api';
import dayjs from 'dayjs';

const roomName = 'room';

const HealthManageDetail = function () {
  const socketRef = useRef();

  const [showStartBtn, setShowStartBtn] = useState(false);
  const [measuredData, setMeasuredData] = useState('');
  const [timer, setTimer] = useState({
    isValid: false,
    time: 0,
  });

  // TODO: 현재까지의 건강 기록 정보를 받아오는 api 함수 추가
  const toast = useCreateToast();
  const { type } = useParams();
  const uid = useSelector(state => state.me.uid);
  const { onOpen, isOpen, onClose } = useDisclosure();
  const queryClient = useQueryClient();
  const { data: vitalSigns } = useQuery(
    ['vitalSigns'],
    () => getVitalSigns(uid, type),
    { enabled: !!uid },
  );
  const { mutate } = useMutation(value => createVitalSign(uid, value), {
    onSuccess: () => {
      toast('건강 기록을 저장하였습니다.');
      queryClient.invalidateQueries('vitalSigns');
    },
  });

  const onStartClick = useCallback(() => {
    socketRef.current.emit(`${type}_start`, roomName);
  }, [type]);

  const onSaveClick = useCallback(() => {
    mutate({
      value: measuredData,
      type,
      date: dayjs(new Date()).format('YYYY-MM-DD'),
      time: dayjs(new Date()).format('HH:mm'),
    });
    setMeasuredData('');
    onClose();
  }, [mutate, measuredData, type, onClose]);

  useEffect(() => {
    console.log('type', type);
    console.log(process.env.REACT_APP_BACKEND_API);
    socketRef.current = io(`${process.env.REACT_APP_BACKEND_API}`);

    socketRef.current.on('disconnect', () => {
      console.log('disconnect');
      setShowStartBtn(false);
    });

    socketRef.current.on('welcome', () => {
      setShowStartBtn(true);
    });

    socketRef.current.on('setup_senser', () => {
      setShowStartBtn(true);
    });

    socketRef.current.on(`${type}_start`, (time = 3) => {
      console.log(time);
      setTimer({
        isValid: true,
        time: time,
      });
      onOpen();
    });

    socketRef.current.on(`${type}_end`, measured => {
      console.log(measured);
      setMeasuredData(Math.round(measured.value * 10) / 10);
    });

    socketRef.current.emit('join_room', roomName);

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, [type, onOpen]);

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

  return (
    <VStack height="full">
      <HStack width="full" justifyContent="space-between" alignItems="center">
        <Heading>그래프</Heading>
        <Button
          colorScheme="primary"
          size="lg"
          isLoading={!showStartBtn}
          loadingText="측정 준비"
          spinnerPlacement="end"
          onClick={onStartClick}
        >
          측정 시작
        </Button>
      </HStack>

      <ResponsiveLine
        data={vitalSigns ? vitalSigns : []}
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

      <Modal isOpen={isOpen} onClose={onClose} closeOnOverlayClick={false}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {measuredData === '' ? '측정 중입니다.' : '측정이 완료되었습니다.'}
          </ModalHeader>
          <ModalBody fontSize="xl" fontWeight="bold" textAlign="center">
            {measuredData === '' ? (
              <>
                {timer.time}
                <Progress
                  mt="8"
                  colorScheme="primary"
                  size="md"
                  borderRadius="md"
                  isIndeterminate
                />
              </>
            ) : (
              <Text>측정 결과: {measuredData}</Text>
            )}
          </ModalBody>
          <ModalFooter>
            {measuredData !== '' && (
              <ButtonGroup gap="4">
                <Button colorScheme="primary" onClick={onSaveClick}>
                  저장하기
                </Button>
                <Button variant="ghost" onClick={onClose}>
                  취소하기
                </Button>
              </ButtonGroup>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </VStack>
  );
};

export default HealthManageDetail;
