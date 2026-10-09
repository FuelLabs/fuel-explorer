import { memo } from 'react';
import { useTranslation } from 'react-i18next';

function _TxFullDateTimestamp({
  timeStamp, // Unix epoch
}: { timeStamp: number | null | undefined }) {
  const { i18n } = useTranslation();
  if (!timeStamp) return null;

  const formattedDate = new Intl.DateTimeFormat(i18n.language, {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  }).format(new Date(timeStamp * 1000));

  return <>{formattedDate}</>;
}

export const TxFullDateTimestamp = memo(_TxFullDateTimestamp);
