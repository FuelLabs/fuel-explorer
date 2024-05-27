import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

export const calculateDateDiffFromTimestamp = (timestamp?: number) => {
  if (!timestamp) return '';

  const blockDate = new Date(timestamp * 1000);

  return calculateDateDiff(blockDate);
};

export const calculateDateDiff = (date?: Date) => {
  if (!date) return '';

  return dayjs(date).fromNow();
};
