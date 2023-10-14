import dayjs from 'dayjs';

const formatTime = value => {
  const time = Number(value);
  const hours = Math.floor(time / 100);
  const minutes = time % 100;

  return `${hours.toString().padStart(2, '0')}:${minutes
    .toString()
    .padStart(2, '0')}`;
};

export const getTrmtHours = async item => {
  if (!item) {
    console.log('no detail infomation');
    return null;
  }

  let lunchSatStart = '';
  let lunchSatEnd = '';

  if (item.lunchSat) {
    [lunchSatStart, lunchSatEnd] = item.lunchSat.split(' - ');
  }

  const trmtHours = {
    mon: `${formatTime(item.trmtMonStart)} ~ ${formatTime(item.trmtMonEnd)}`,
    tue: `${formatTime(item.trmtTueStart)} ~ ${formatTime(item.trmtTueEnd)}`,
    wed: `${formatTime(item.trmtWedStart)} ~ ${formatTime(item.trmtWedEnd)}`,
    thu: `${formatTime(item.trmtThuStart)} ~ ${formatTime(item.trmtThuEnd)}`,
    fri: `${formatTime(item.trmtFriStart)} ~ ${formatTime(item.trmtFriEnd)}`,
    sat: `${formatTime(item.trmtSatStart)} ~ ${formatTime(item.trmtSatEnd)}`,
    sun: `${item.noTrmtSun}`,
    hol: `${item.noTrmtHoli}`,
    lunchWeek: item.lunchWeek?.replaceAll('시', ':').replaceAll('분', ''),
    lunchSat:
      lunchSatStart === '' ? '없음' : `${lunchSatStart} ~ ${lunchSatEnd}`,
  };

  return trmtHours;
};

export const getTimeTable = (trmtHours, lunchHours = '00:00~00:00') => {
  const timeTable = [];
  try {
    let [startTime, endTime] = trmtHours.split('~');
    let [lunchStart, lunchEnd] = lunchHours.split('~');

    startTime = Number(startTime.replace(':', ''));
    endTime = Number(endTime.replace(':', ''));
    lunchStart = Number(lunchStart.replace(':', ''));
    lunchEnd = Number(lunchEnd.replace(':', ''));

    const current = formatTime(dayjs(new Date()).format('HH:mm'));

    for (let time = startTime; time < endTime; time += 30) {
      if (time % 100 === 60) {
        time += 40;
      }

      if (time <= current) {
        continue;
      } else if (time >= lunchStart && time < lunchEnd) {
        continue;
      }

      timeTable.push(formatTime(time));
    }

    return timeTable;
  } catch (error) {
    console.log(error);
    return [];
  }
};
