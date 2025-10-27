import dayjs from 'dayjs';

export const formatTimestamp = (timestamp?: number) => {
  if (!timestamp) {
    return 'Unknown';
  }

  const date = dayjs.unix(timestamp);
  return dayjs(date).format('MMMM DD, YYYY');
};
