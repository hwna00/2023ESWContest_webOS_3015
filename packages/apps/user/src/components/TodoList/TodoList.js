import {
  Box,
  Checkbox,
  Divider,
  ListItem,
  Text,
  UnorderedList,
} from '@chakra-ui/react';
import dayjs from 'dayjs';
import PropTypes from 'prop-types';

const TodoList = function ({ selectedDay, todoOfSelectedDay }) {
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
        {dayjs(selectedDay).format('YYYY-MM-DD') ===
        dayjs(new Date()).format('YYYY-MM-DD')
          ? '오늘 할 일'
          : dayjs(selectedDay).format('YYYY-MM-DD')}
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
        {todoOfSelectedDay?.items?.map(item => {
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

TodoList.defaultProps = {
  selectedDay: new Date(),
  todoOfSelectedDay: {},
};

TodoList.propTypes = {
  selectedDay: PropTypes.instanceOf(Date),
  todoOfSelectedDay: PropTypes.object,
};

export default TodoList;
