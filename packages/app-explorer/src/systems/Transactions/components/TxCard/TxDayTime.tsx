import { createDayjs } from 'app-commons';
import { useTranslation } from 'react-i18next';

const dayjs = createDayjs();

export function TxDayTime({ timeStamp }: { timeStamp?: string | null }) {
  const { t } = useTranslation();
  if (!timeStamp) return null;
  const time = dayjs.unix(Number(timeStamp));
  const today = dayjs();
  const label = time.isSame(today, 'day')
    ? t('common.today')
    : time.isSame(today.subtract(1, 'day'), 'day')
      ? t('common.yesterday')
      : time.format(time.isSame(today, 'year') ? 'DD MMM' : 'DD MMM YYYY');
  return (
    <span title={time.format('DD MMM YYYY - hh:mm:ss A')}>
      {label} · {time.format('hh:mm:ss A')}
    </span>
  );
}
