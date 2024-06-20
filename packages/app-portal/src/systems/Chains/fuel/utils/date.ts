import { createDayjs } from 'app-commons/src/utils/dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

export const distanceToNow = (fromDate: Date) => {
  const dayjs = createDayjs();
  dayjs.extend(relativeTime, {
    rounding: (num) => Math.ceil(num),
  });
  return dayjs(fromDate).toNow(true);
};
