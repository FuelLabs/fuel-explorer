import { createDayjs } from 'app-commons';

const dayjs = createDayjs();

function dayLabel(time: ReturnType<typeof dayjs>) {
  const today = dayjs();
  if (time.isSame(today, 'day')) return 'Today';
  if (time.isSame(today.subtract(1, 'day'), 'day')) return 'Yesterday';
  return time.format(time.isSame(today, 'year') ? 'DD MMM' : 'DD MMM YYYY');
}

export function TxDayTime({ timeStamp }: { timeStamp?: string | null }) {
  if (!timeStamp) return null;
  const time = dayjs.unix(Number(timeStamp));
  return (
    <span title={time.format('DD MMM YYYY - hh:mm:ss A')}>
      {dayLabel(time)} · {time.format('hh:mm:ss A')}
    </span>
  );
}
