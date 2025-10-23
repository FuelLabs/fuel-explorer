import dayjs from 'dayjs';

export function getSecondsBetweenDates(
  startDate: dayjs.ConfigType,
  endDate: dayjs.ConfigType,
): number {
  const start = dayjs(startDate);
  const end = dayjs(endDate);

  return end.diff(start, 'second');
}

export function getDiffSecondsToNow(date: Date) {
  const now = new Date();
  const diff = getSecondsBetweenDates(now, date);
  return Math.max(diff, 0);
}
