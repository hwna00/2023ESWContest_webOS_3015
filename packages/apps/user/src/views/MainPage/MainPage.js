import { useEffect, useState } from 'react';
import Calendar from '../../components/Calendar/Calendar';
import 'react-calendar/dist/Calendar.css';
import dayjs from 'dayjs';
import { Button, ButtonGroup, HStack, VStack } from '@chakra-ui/react';
import PushAlarm from '../../components/PushAlarm/PushAlarm';
import TodoList from '../../components/TodoList/TodoList';

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
  const [day, setDay] = useState(new Date());
  const [today, setToday] = useState([]);

  useEffect(() => {
    const todoOfTheDay = todos.find(
      todo => todo.date === dayjs(day).format('YYYY-MM-DD'),
    );
    setToday(todoOfTheDay);
  }, [day]);

  return (
    <HStack height={'full'}>
      <Calendar day={day} setDay={setDay} todos={todos} />
      <VStack flex={2} height={'full'} justifyContent={'space-evenly'}>
        <PushAlarm />
        <TodoList day={day} today={today} />
        <ButtonGroup
          width={'full'}
          justifyContent={'space-between'}
          alignItems={'center'}
        >
          <Button colorScheme="red" py={'8'} width={'full'} fontSize={'lg'}>
            긴급 전화
          </Button>
          <Button
            variant={'outline'}
            colorScheme="primary"
            py={'8'}
            width={'full'}
            fontSize={'lg'}
          >
            챗봇 호출
          </Button>
        </ButtonGroup>
      </VStack>
    </HStack>
  );
};

export default MainPage;
