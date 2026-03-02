import { createDayjs } from 'app-commons';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import { memo } from 'react';

function _TxFullDateTimestamp({
  timeStamp, // Unix epoch
}: { timeStamp: number | null | undefined }) {
  if (!timeStamp) return null;

  const dayjs = createDayjs();
  dayjs.extend(utc);
  dayjs.extend(timezone);
  const formattedDate = dayjs
    .unix(timeStamp)
    .format('DD MMM YYYY - hh:mm:ss A');

  return <>{formattedDate}</>;
}

export const TxFullDateTimestamp = memo(_TxFullDateTimestamp);
