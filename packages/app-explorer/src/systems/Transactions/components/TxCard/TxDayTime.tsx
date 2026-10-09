import { createDayjs } from 'app-commons';
import { useTranslation } from 'react-i18next';

const dayjs = createDayjs();

export function TxDayTime({ timeStamp }: { timeStamp?: string | null }) {
  const { t, i18n } = useTranslation();
  if (!timeStamp) return null;
  const time = dayjs.unix(Number(timeStamp));
  const today = dayjs();
  const date = time.toDate();
  const sameYear = time.isSame(today, 'year');
  const label = time.isSame(today, 'day')
    ? t('common.today')
    : time.isSame(today.subtract(1, 'day'), 'day')
      ? t('common.yesterday')
      : new Intl.DateTimeFormat(
          i18n.language,
          sameYear
            ? { day: '2-digit', month: 'short' }
            : { day: '2-digit', month: 'short', year: 'numeric' },
        ).format(date);
  const clock = new Intl.DateTimeFormat(i18n.language, {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  }).format(date);
  const title = new Intl.DateTimeFormat(i18n.language, {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  }).format(date);
  return (
    <span title={title}>
      {label} · {clock}
    </span>
  );
}
