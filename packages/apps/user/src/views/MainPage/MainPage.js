import { useRef, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import dayjs from 'dayjs';
import {
  Box,
  Button,
  ButtonGroup,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  HStack,
  ListItem,
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
    ],
  },
  {
    date: '2023-08-18',
    items: [
      {
        id: 1,
        title: '비타민 먹기',
        description: '08:30',
      },
    ],
  },
  {
    date: '2023-08-21',
    items: [
      {
        id: 1,
        title: '비타민 먹기',
        description: '08:30',
      },
    ],
  },
  {
    date: '2023-08-30',
    items: [
      {
        id: 1,
        title: '비타민 먹기',
        description: '08:30',
      },
    ],
  },
];

const MainPage = function () {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [date, setDate] = useState(new Date());
  const pushRef = useRef();
  console.log(date);

  return (
    <HStack height={'full'}>
      <Box width={'60%'} height={'full'}>
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
      <VStack>
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
        <Box>오늘 할 일</Box>
        <ButtonGroup>
          <Button>긴급 전화</Button>
          <Button>챗봇</Button>
        </ButtonGroup>
      </VStack>
    </HStack>
  );
};

export default MainPage;
