import { createDayjs } from 'app-commons';
import relativeTime from 'dayjs/plugin/relativeTime';
import utc from 'dayjs/plugin/utc';

export const distanceToNow = (fromDate: Date) => {
  const dayjs = createDayjs();
  dayjs.extend(relativeTime, {
    rounding: (num) => Math.ceil(num),
  });
  dayjs.extend(utc);
  return dayjs.utc(fromDate).toNow(true);
};

/**
 *
 * @param timestamp e.g. 1728815202
 */
export const distanceToNowNumber = (timestamp: number) => {
  const dayjs = createDayjs();
  dayjs.extend(relativeTime, {
    rounding: (num) => Math.ceil(num),
  });
  dayjs.extend(utc);
  return dayjs.utc(timestamp * 1000).fromNow(true);
};
