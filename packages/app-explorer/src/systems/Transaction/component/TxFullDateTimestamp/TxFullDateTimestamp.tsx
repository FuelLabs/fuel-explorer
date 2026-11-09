import { formatDateTimeTitle } from 'app-commons';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';

function _TxFullDateTimestamp({
  timeStamp, // Unix epoch
}: { timeStamp: number | null | undefined }) {
  const { i18n } = useTranslation();
  if (!timeStamp) return null;

  return <>{formatDateTimeTitle(timeStamp * 1000, i18n.language)}</>;
}

export const TxFullDateTimestamp = memo(_TxFullDateTimestamp);
