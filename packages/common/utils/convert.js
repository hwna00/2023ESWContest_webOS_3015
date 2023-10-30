const formatTime = time => {
  const hours = Math.floor(time / 100);
  const minutes = time % 100;

  return `${hours.toString().padStart(2, '0')}:${minutes
    .toString()
    .padStart(2, '0')}`;
};

const addTime = timeTable => {
  const timeList = {
    mon: [],
    tue: [],
    wed: [],
    thu: [],
    fri: [],
    sat: [],
    sun: [],
  };

  Object.keys(timeList).forEach(day => {
    if (!(day === 'sun')) {
      const startKey = `trmt${day.charAt(0).toUpperCase() + day.slice(1)}Start`;
      const endKey = `trmt${day.charAt(0).toUpperCase() + day.slice(1)}End`;

      let startTime = parseInt(timeTable.treatmentHours[startKey], 10);
      const endTime = parseInt(timeTable.treatmentHours[endKey], 10);

      let lunchStartTime;
      let lunchEndTime;

      if (day !== 'sat' && timeTable.treatmentHours.lunchWeekStart) {
        lunchStartTime = parseInt(
          timeTable.treatmentHours.lunchWeekStart.replace(':', ''),
          10,
        );
        lunchEndTime = parseInt(
          timeTable.treatmentHours.lunchWeekEnd.replace(':', ''),
          10,
        );
      } else if (timeTable.treatmentHours.lunchSatStart) {
        lunchStartTime = parseInt(
          timeTable.treatmentHours.lunchSatStart.replace(':', ''),
          10,
        );
        lunchEndTime = parseInt(
          timeTable.treatmentHours.lunchSatEnd.replace(':', ''),
          10,
        );
      }

      while (startTime < endTime) {
        if (!(startTime >= lunchStartTime && startTime < lunchEndTime)) {
          timeList[day].push(formatTime(startTime));
        }
        startTime += 30;

        if (startTime % 100 === 60) {
          startTime += 40;
        }
      }
    }
  });

  return timeList;
};

const hospitalDtlconverter = async item => {
  console.log(item);
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
      trmtSunStart: String(item.trmtSunStart),
      trmtSunEnd: String(item.trmtSunEnd),
      noTrmtHoli: item.noTrmtHoli,
      noTrmtSun: item.noTrmtSun,
    },
  };
  return addTime(timeTable);
};

export default hospitalDtlconverter;
