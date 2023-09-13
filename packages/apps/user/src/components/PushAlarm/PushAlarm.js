import { useCallback, useEffect, useRef, useState } from 'react';

import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  useDisclosure,
  Button,
  UnorderedList,
  ListItem,
  DrawerOverlay,
  Checkbox,
  HStack,
  Text,
} from '@chakra-ui/react';

const PushAlarm = function () {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [notifications, setNotifications] = useState([]);
  const pushRef = useRef();

  useEffect(() => {
    setNotifications([
      {
        id: 0,
        title: '병원 예약이 완료되었습니다',
      },
      {
        id: 1,
        title: '감기약 복용 - 13시 30분',
      },
      {
        id: 2,
        title: '감기약 복용 - 20시 30분',
      },
    ]);
  }, []);

  const removePushAlarm = useCallback(
    id => {
      const newNotis = notifications.filter(noti => noti.id !== id);
      setNotifications(newNotis);
    },
    [notifications],
  );

  return (
    <>
      <Button
        width="full"
        size={'lg'}
        ref={pushRef}
        colorScheme="primary"
        onClick={onOpen}
      >
        푸시 알림 ({notifications.length})
      </Button>

      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={pushRef}
        isFullHeight
      >
        <DrawerOverlay />
        <DrawerContent
          bgColor="white"
          backdropBlur="md"
          boxShadow="none"
          transition="0.2s ease-out"
        >
          <DrawerHeader>푸시 알림</DrawerHeader>

          <DrawerBody>
            <UnorderedList
              styleType="none"
              spacing="6"
              maxHeight="80%"
              overflow="scroll"
              scrollBehavior="smooth"
            >
              {notifications.length !== 0 ? (
                notifications.map(notification => (
                  <ListItem
                    key={notification.title}
                    width="full"
                    p="4"
                    bgColor="primary.200"
                    borderRadius="lg"
                  >
                    <HStack justifyContent="space-between" alignItems="center">
                      <Text>{notification.title}</Text>
                      <Checkbox
                        // eslint-disable-next-line
                        onChange={() => removePushAlarm(notification.id)}
                        colorScheme="primary"
                        borderColor="black"
                      />
                    </HStack>
                  </ListItem>
                ))
              ) : (
                <Text>모든 알림을 확인했습니다</Text>
              )}
            </UnorderedList>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default PushAlarm;
