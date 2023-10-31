import { useCallback, useEffect, useRef, useState } from 'react';

import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import 'react-calendar/dist/Calendar.css';
import dayjs from 'dayjs';
import {
  Button,
  ButtonGroup,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  VStack,
  useDisclosure,
} from '@chakra-ui/react';
import { io } from 'socket.io-client';
import LS2Request from '@enact/webos/LS2Request';

import TodoList from '../../components/TodoList/TodoList';
import PushAlarm from '../../components/PushAlarm/PushAlarm';
import Calendar from '../../components/Calendar/Calendar';
import { useQuery } from '@tanstack/react-query';
import { getCenters } from '../../api';

const bridge = new LS2Request();

const todos = [
  {
    date: '2023-08-16',
    items: [
      {
        id: 1,
        title: '비타민 먹기',
        description: '08:30',
      },
      {
        id: 2,
        title: '비타민 먹기',
        description: '12:30',
      },
      {
        id: 3,
        title: '비타민 먹기',
        description: '18:30',
      },
      {
        id: 4,
        title: '비타민 먹기',
        description: '08:30',
      },
      {
        id: 5,
        title: '비타민 먹기',
        description: '12:30',
      },
      {
        id: 6,
        title: '비타민 먹기',
        description: '18:30',
      },
    ],
  },
  {
    date: '2023-08-18',
    items: [
      {
        id: 1,
        title: '감기약 먹기',
        description: '08:30',
      },
    ],
  },
  {
    date: '2023-08-21',
    items: [
      {
        id: 1,
        title: '맛있는 거 먹기',
        description: '08:30',
      },
    ],
  },
  {
    date: '2023-08-30',
    items: [
      {
        id: 1,
        title: '안 먹기',
        description: '08:30',
      },
    ],
  },
];

const MainPage = function () {
  const socketRef = useRef();
  const [selectedDay, setSelectedDay] = useState(new Date());
  const [todoOfSelectedDay, setTodoOfSelectedDay] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const uid = useSelector(state => state.me.uid);
  const { data: centers } = useQuery(['centers'], getCenters);

  const onEmergencyClick = useCallback(
    centerId => {
      socketRef.current.emit('emergency_call', centerId, uid);
      setIsLoading(true);
    },
    [uid],
  );

  useEffect(() => {
    const todoOfTheDay = todos.find(
      todo => todo.date === dayjs(selectedDay).format('YYYY-MM-DD'),
    );
    setTodoOfSelectedDay(todoOfTheDay);
  }, [selectedDay]);

  useEffect(() => {
    socketRef.current = io(process.env.REACT_APP_BACKEND_API);

    socketRef.current.on('emergency_ready', emergencyId => {
      setIsLoading(false);
      navigate(`/treatment/${emergencyId}`);
    });

    socketRef.current.emit('join_room', uid);
  }, [navigate, uid]);

  const onls2click = useCallback(() => {
    const datetime = dayjs(new Date())
      .add(3, 'second')
      .format('YYYY-MM-DD HH:mm:ss');
    console.log(datetime);
    const parms = {
      datetime,
      activityname: datetime,
    };

    const lsRequest = {
      service: 'luna://com.housepital.user.app.service',
      method: 'createAppointmentActivity',
      parameters: parms,
      onSuccess: payload => console.log('success', payload),
      onFailure: payload => console.log('fail', payload),
    };

    bridge.send(lsRequest);
  }, []);

  return (
    <HStack height="full" gap="6">
      <Calendar
        selectedDay={selectedDay}
        setSelectedDay={setSelectedDay}
        todos={todos}
      />
      <VStack flex={2} height="full" justifyContent="space-between">
        <PushAlarm />
        <TodoList
          selectedDay={selectedDay}
          todoOfSelectedDay={todoOfSelectedDay}
        />
        <ButtonGroup
          width="full"
          justifyContent="space-between"
          alignItems="center"
        >
          <Button
            colorScheme="red"
            py="8"
            width="full"
            fontSize="lg"
            variant="outline"
            onClick={onOpen}
          >
            긴급 전화
          </Button>
          <Button
            variant="outline"
            colorScheme="primary"
            py="8"
            width="full"
            fontSize="lg"
            onClick={onls2click}
          >
            챗봇 호출
          </Button>
        </ButtonGroup>
      </VStack>
      <Modal size="xl" isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>긴급 상황인가요?</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text size="2xl" fontWeight="bold">
              {isLoading
                ? '접수 대기 중입니다. 현재 화면에서 머물러주세요.'
                : '가까운 상황실을 선택해주세요'}
            </Text>
            {isLoading ? (
              'loading...'
            ) : (
              <VStack gap="4" maxHeight="80" mt="4">
                {centers?.map(center => (
                  <HStack
                    key={center.id}
                    width="full"
                    padding="4"
                    bgColor="primary.100"
                    borderRadius="md"
                    justifyContent="space-between"
                    alignItems="center"
                    onClick={() => onEmergencyClick(center.id)}
                  >
                    <Text>{center.name}</Text>
                  </HStack>
                ))}
              </VStack>
            )}
          </ModalBody>

          <ModalFooter />
        </ModalContent>
      </Modal>
    </HStack>
  );
};

export default MainPage;
