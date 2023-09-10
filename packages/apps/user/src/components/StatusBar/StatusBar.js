import { useState, useEffect } from 'react';

import dayjs from 'dayjs';
import { HStack, Text } from '@chakra-ui/react';
import 'dayjs/locale/ko';

const StatusBar = function () {
  dayjs.locale('ko');

  const [currentTime, setCurrentTime] = useState(
    dayjs().format('MM월 DD일 (ddd) 오후 HH:mm'),
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(dayjs().format('MM월 DD일 (ddd) 오후 HH:mm'));
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <HStack
      justifyContent="flex-end"
      alignItems="center"
      bg="primary.200"
      width="full"
      height="8"
      px="4"
      fontWeight="bold"
      position="absolute"
      top="0"
      left="0"
      zIndex="1"
    >
      <Text>{currentTime}</Text>
    </HStack>
  );
};

export default StatusBar;
