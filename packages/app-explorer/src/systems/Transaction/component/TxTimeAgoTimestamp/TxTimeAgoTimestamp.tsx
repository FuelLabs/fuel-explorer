import { createDayjs } from 'app-commons';
import relativeTime from 'dayjs/plugin/relativeTime';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import { type ReactNode, memo, useEffect, useState } from 'react';

const dayjs = createDayjs();
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(relativeTime);

function _TxTimeAgoTimestamp({
  timeStamp,
  loading,
}: { timeStamp: number | null | undefined; loading: ReactNode }) {
  const [timeAgo, setTimeAgo] = useState<string>(() => {
    if (typeof window === 'undefined' || timeStamp == null) return '';
    return dayjs.unix(timeStamp).fromNow(true);
  });

  useEffect(() => {
    if (timeStamp == null || typeof window === 'undefined') return;

    const updateTimeAgo = () => {
      setTimeAgo(dayjs.unix(timeStamp).fromNow(true));
    };

    updateTimeAgo();
    const interval = setInterval(updateTimeAgo, 1000);

    return () => clearInterval(interval);
  }, [timeStamp]);

  if (timeStamp == null || !timeAgo) return loading;

  return `${timeAgo} ago`;
}

export const TxTimeAgoTimestamp = memo(_TxTimeAgoTimestamp);
