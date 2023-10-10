import { fetchResultsTime } from '@housepital/hospital-desk/src/api';

const convert = async ykiho => {
  const data = await fetchResultsTime(ykiho);
  const { item } = data.response.body.items;
  const [rcvSatStart, rcvSatEnd] = item.rcvSat.split(' - ');
  const [rcvWeekStart, rcvWeekEnd] = item.rcvWeek.split(' - ');

  let lunchWeekStart;
  let lunchWeekEnd;
  let lunchSatStart;
  let lunchSatEnd;

  if (item.lunchWeek) {
    [lunchWeekStart, lunchWeekEnd] = item.lunchWeek.split(' - ');
  }

  if (item.lunchSat) {
    [lunchSatStart, lunchSatEnd] = item.lunchSat.split(' - ');
  }
  const timeTable = {
    treatmentHours: {
      rcvSatStart: rcvSatStart.replace(':', ''),
      rcvSatEnd: rcvSatEnd.replace(':', ''),
      rcvWeekStart: rcvWeekStart.replace(':', ''),
      rcvWeekEnd: rcvWeekEnd.replace(':', ''),
      lunchSatStart,
      lunchSatEnd,
      lunchWeekStart,
      lunchWeekEnd,
      trmtMonStart: String(item.trmtMonStart),
      trmtMonEnd: String(item.trmtMonEnd),
      trmtTueStart: String(item.trmtTueStart),
      trmtTueEnd: String(item.trmtThuEnd),
      trmtWedStart: String(item.trmtWedStart),
      trmtWedEnd: String(item.trmtWedEnd),
      trmtThuStart: String(item.trmtThuStart),
      trmtThuEnd: String(item.trmtThuEnd),
      trmtFriStart: String(item.trmtFriStart),
      trmtFriEnd: String(item.trmtFriEnd),
      trmtSatStart: String(item.trmtSatStart),
      trmtSatEnd: String(item.trmtSatEnd),
      noTrmtHoli: item.noTrmtHoli,
      noTrmtSun: item.noTrmtSun,
    },
  };
  return timeTable;
};

export default convert;
