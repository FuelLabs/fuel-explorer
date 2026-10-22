import { createDayjs, syncDayjsLocale } from 'app-commons';
import relativeTime from 'dayjs/plugin/relativeTime';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import { type ReactNode, memo, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

function _TxTimeAgoTimestamp({
  timeStamp,
  loading,
}: { timeStamp: number | null | undefined; loading: ReactNode }) {
  const { i18n } = useTranslation();
  const [timeAgo, setTimeAgo] = useState('');

  useEffect(() => {
    if (!timeStamp || typeof window === 'undefined') return;

    const dayjs = createDayjs();
    dayjs.extend(utc);
    dayjs.extend(timezone);
    dayjs.extend(relativeTime);

    const updateTimeAgo = () => {
      syncDayjsLocale(i18n.language);
      setTimeAgo(dayjs.unix(timeStamp).fromNow());
    };

    updateTimeAgo();
    const interval = setInterval(updateTimeAgo, 1000);

    return () => clearInterval(interval);
  }, [timeStamp, i18n.language]);

  if (!timeStamp || !timeAgo) return loading;

  return timeAgo;
}

export const TxTimeAgoTimestamp = memo(_TxTimeAgoTimestamp);
