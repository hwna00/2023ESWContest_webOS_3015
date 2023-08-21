import { useState, useEffect } from 'react';
import { HStack, Text } from '@chakra-ui/react';
import dayjs from 'dayjs';
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
      justifyContent={'flex-end'}
      alignItems={'center'}
      bg={'primary.200'}
      w={'full'}
      height={'8'}
      px={'4'}
      fontWeight={'bold'}
    >
      <Text>{currentTime}</Text>
    </HStack>
  );
};

export default StatusBar;
