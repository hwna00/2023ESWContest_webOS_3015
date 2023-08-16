import { useRef } from 'react';
import 'react-calendar/dist/Calendar.css';
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

const MainPage = function () {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const pushRef = useRef();

  return (
    <HStack height={'full'}>
      <Box width={'60%'}>캘린더</Box>
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
