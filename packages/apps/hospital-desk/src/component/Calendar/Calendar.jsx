/* eslint-disable */
import { Box } from '@chakra-ui/react';
import ReactCalendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import dayjs from 'dayjs';
import PropTypes from 'prop-types';
import './Calendar.css';

const Calendar = function ({ selectedDay, setSelectedDay }) {
  return (
    <Box flex={3} height={'full'}>
      <ReactCalendar
        calendarType="gregory"
        // eslint-disable-next-line
        formatDay={(locale, date) => dayjs(date).format('DD')}
        prev2Label={null}
        next2Label={null}
        maxDetail="month"
        value={selectedDay}
        onChange={setSelectedDay}
        defaultValue={new Date()}
      />
    </Box>
  );
};

Calendar.defaultProps = {
  selectedDay: new Date(),
};

Calendar.propTypes = {
  selectedDay: PropTypes.instanceOf(Date).isRequired,
  setSelectedDay: PropTypes.func.isRequired,
};

export default Calendar;
