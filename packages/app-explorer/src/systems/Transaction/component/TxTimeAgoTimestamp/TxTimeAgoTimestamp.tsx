import { createDayjs } from 'app-commons';
import relativeTime from 'dayjs/plugin/relativeTime';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import { type ReactNode, memo, useEffect, useState } from 'react';

function _TxTimeAgoTimestamp({
  timeStamp,
  loading,
}: { timeStamp: number | null | undefined; loading: ReactNode }) {
  const [timeAgo, setTimeAgo] = useState<string>(() => {
    if (typeof window === 'undefined' || !timeStamp) return '';
    const dayjs = createDayjs();
    dayjs.extend(utc);
    dayjs.extend(timezone);
    dayjs.extend(relativeTime);
    return dayjs.unix(timeStamp).fromNow(true);
  });

  useEffect(() => {
    if (!timeStamp || typeof window === 'undefined') return;

    const dayjs = createDayjs();
    dayjs.extend(utc);
    dayjs.extend(timezone);
    dayjs.extend(relativeTime);

    const updateTimeAgo = () => {
      setTimeAgo(dayjs.unix(timeStamp).fromNow(true));
    };

    updateTimeAgo();
    const interval = setInterval(updateTimeAgo, 1000);

    return () => clearInterval(interval);
  }, [timeStamp]);

  if (!timeStamp || !timeAgo) return loading;

  return `${timeAgo} ago`;
}

export const TxTimeAgoTimestamp = memo(_TxTimeAgoTimestamp);
