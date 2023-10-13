/* eslint-disable */
import { Box } from '@chakra-ui/react';
import ReactCalendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import dayjs from 'dayjs';
import PropTypes from 'prop-types';
import './Calendar.css';

const Calendar = function ({ selectedDay, setSelectedDay, appointments }) {
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
        tileContent={({ date }) => {
          if (
            appointments.find(
              appointment =>
                appointment.date === dayjs(date).format('YYYY-MM-DD'),
            )
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
              />
            );
          }
        }}
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
