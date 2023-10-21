import { useEffect, useState } from 'react';

import 'react-calendar/dist/Calendar.css';
import dayjs from 'dayjs';
import { Button, ButtonGroup, HStack, VStack } from '@chakra-ui/react';

import TodoList from '../../components/TodoList/TodoList';
import PushAlarm from '../../components/PushAlarm/PushAlarm';
import Calendar from '../../components/Calendar/Calendar';
import LS2Request from '@enact/webos/LS2Request';

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
  const [selectedDay, setSelectedDay] = useState(new Date());
  const [todoOfSelectedDay, setTodoOfSelectedDay] = useState({});

  useEffect(() => {
    const todoOfTheDay = todos.find(
      todo => todo.date === dayjs(selectedDay).format('YYYY-MM-DD'),
    );
    setTodoOfSelectedDay(todoOfTheDay);
  }, [selectedDay]);

  const webOSBridge = new LS2Request();

  const lstest = () => {
    const lsRequest = {
      service: 'luna://com.houspital.app.user.service',
      method: 'createSchedule',
      parameter: 'hi',
      onSuccess: () => console.log('success'),
      onFailure: () => console.log('fail'),
    };
    webOSBridge.send(lsRequest);
  };

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
          <Button colorScheme="red" py="8" width="full" fontSize="lg">
            긴급 전화
          </Button>
          <Button
            variant="outline"
            colorScheme="primary"
            py="8"
            width="full"
            fontSize="lg"
            onClick={() => lstest}
          >
            챗봇 호출
          </Button>
        </ButtonGroup>
      </VStack>
    </HStack>
  );
};

export default MainPage;
