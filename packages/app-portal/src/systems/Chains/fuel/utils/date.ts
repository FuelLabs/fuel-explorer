import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime, {
  rounding: (num) => Math.ceil(num),
});

export const distanceToNow = (fromDate: Date) => {
  return dayjs(fromDate).toNow(true);
};
