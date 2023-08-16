import { useEffect, useRef, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import dayjs from 'dayjs';
import {
  Box,
  Button,
  ButtonGroup,
  Checkbox,
  Divider,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  HStack,
  Heading,
  ListItem,
  Text,
  UnorderedList,
  VStack,
  useDisclosure,
} from '@chakra-ui/react';
import './MainPage.css';

const notifications = [
  {
    title: '감기약 복용 - 8시 30분',
  },
  {
    title: '감기약 복용 - 13시 30분',
  },
  {
    title: '감기약 복용 - 20시 30분',
  },
];

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
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [date, setDate] = useState(new Date());
  const [today, setToday] = useState([]);
  const pushRef = useRef();

  useEffect(() => {
    const todoOfTheDay = todos.find(
      todo => todo.date === dayjs(date).format('YYYY-MM-DD'),
    );
    setToday(todoOfTheDay);
  }, [todos, date]);

  return (
    <HStack height={'full'}>
      <Box flex={3} height={'full'}>
        <Calendar
          calendarType="gregory"
          formatDay={(locale, date) => dayjs(date).format('DD')}
          prev2Label={null}
          next2Label={null}
          maxDetail="month"
          value={date}
          onChange={setDate}
          defaultValue={new Date()}
          tileContent={({ _, date, view }) => {
            if (
              todos.find(todo => todo.date === dayjs(date).format('YYYY-MM-DD'))
            ) {
              return (
                <Box
                  className="dot"
                  bgColor={'yellow.500'}
                  width={'2'}
                  height={'2'}
                  borderRadius={'full'}
                  position={'absolute'}
                  bottom={'2'}
                  left={'calc(50% - 4px)'}
                ></Box>
              );
            }
          }}
        />
      </Box>
      <VStack flex={2} height={'full'} justifyContent={'space-evenly'}>
        <Button ref={pushRef} colorScheme="primary" onClick={onOpen}>
          푸시 알림
        </Button>
        <Drawer
          isOpen={isOpen}
          placement="right"
          onClose={onClose}
          finalFocusRef={pushRef}
          isFullHeight
        >
          <DrawerContent
            bgColor={'transparent'}
            boxShadow={'none'}
            transition={'0.2s ease-out'}
          >
            <DrawerHeader>푸시 알림</DrawerHeader>

            <DrawerBody>
              <UnorderedList
                styleType={'none'}
                spacing={'6'}
                maxHeight={'80%'}
                overflow={'scroll'}
                scrollBehavior={'smooth'}
              >
                {notifications.map(notification => {
                  return (
                    <ListItem
                      key={notification.title}
                      p={'4'}
                      bgColor={'primary.200'}
                      borderRadius={'lg'}
                      boxShadow={'lg'}
                    >
                      {notification.title}
                    </ListItem>
                  );
                })}
              </UnorderedList>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
        <Box
          bgColor={'primary.100'}
          padding={'4'}
          borderRadius={'md'}
          width={'full'}
          height={'70%'}
          overflow={'hidden'}
        >
          <Text fontSize={'xl'} fontWeight={'bold'} mb={'2'}>
            {dayjs(date).format('YYYY-MM-DD') ===
            dayjs(new Date()).format('YYYY-MM-DD')
              ? '오늘 할 일'
              : dayjs(date).format('YYYY-MM-DD')}
          </Text>

          <Divider bgColor={'primary.900'} opacity={'50%'} height={'0.5'} />

          <UnorderedList
            styleType={'none'}
            spacing={'6'}
            height={'80%'}
            py={'4'}
            overflowY={'scroll'}
            scrollBehavior={'smooth'}
          >
            {today?.items?.map(item => {
              return (
                <Checkbox
                  width={'full'}
                  spacing={'4'}
                  colorScheme="primary"
                  iconSize="3rem"
                  borderColor={'primary.900'}
                >
                  <ListItem key={item.id}>
                    <Text fontSize={'lg'}>{item.title}</Text>
                    <Text>{item.description}</Text>
                  </ListItem>
                </Checkbox>
              );
            })}
          </UnorderedList>
        </Box>
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
