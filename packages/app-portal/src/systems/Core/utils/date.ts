import { formatDistanceToNow } from 'date-fns';

export const calculateDateDiffFromTimestamp = (timestamp?: number) => {
  if (!timestamp) return '';

  const blockDate = new Date(timestamp * 1000);

  return calculateDateDiff(blockDate);
};

export const calculateDateDiff = (date?: Date) => {
  if (!date) return '';

  const diffInDays = formatDistanceToNow(date, { addSuffix: true });
  return diffInDays.replace('less than a minute ago', 'just now');
};
