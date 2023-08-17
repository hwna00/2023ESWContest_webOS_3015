import {
  Box,
  Checkbox,
  Divider,
  ListItem,
  Text,
  UnorderedList,
} from '@chakra-ui/react';
import dayjs from 'dayjs';

const TodoList = function ({ day, today }) {
  return (
    <Box
      bgColor={'primary.100'}
      padding={'4'}
      borderRadius={'md'}
      width={'full'}
      height={'70%'}
      overflow={'hidden'}
    >
      <Text fontSize={'xl'} fontWeight={'bold'} mb={'2'}>
        {dayjs(day).format('YYYY-MM-DD') ===
        dayjs(new Date()).format('YYYY-MM-DD')
          ? '오늘 할 일'
          : dayjs(day).format('YYYY-MM-DD')}
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
              key={item.id}
              width={'full'}
              spacing={'4'}
              colorScheme="primary"
              iconSize="3rem"
              borderColor={'primary.900'}
            >
              <ListItem>
                <Text fontSize={'lg'}>{item.title}</Text>
                <Text>{item.description}</Text>
              </ListItem>
            </Checkbox>
          );
        })}
      </UnorderedList>
    </Box>
  );
};

export default TodoList;
