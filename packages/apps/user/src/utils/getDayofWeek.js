import dayjs from 'dayjs';

export const dateToday = date => {
  const day = dayjs(date).get('day');
  switch (day) {
    case 0:
      return 'sun';
    case 1:
      return 'mon';
    case 2:
      return 'tue';
    case 3:
      return 'wed';
    case 4:
      return 'thu';
    case 5:
      return 'fri';
    case 6:
      return 'sat';
    default:
      return '';
  }
};
