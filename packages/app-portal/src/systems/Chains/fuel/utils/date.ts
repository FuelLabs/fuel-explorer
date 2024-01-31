import { differenceInSeconds, formatDistanceToNowStrict } from 'date-fns';

export const distanceToNow = (fromDate: Date) => {
  const difference = differenceInSeconds(fromDate, new Date());

  return formatDistanceToNowStrict(fromDate, {
    roundingMethod: 'ceil',
    unit: difference < 3600 ? 'minute' : 'hour',
  });
};
