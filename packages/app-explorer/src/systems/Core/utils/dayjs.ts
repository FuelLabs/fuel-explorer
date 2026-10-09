import { syncDayjsLocale } from 'app-commons/src/utils/dayjs';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);

export function fromNow(timestamp: string) {
  syncDayjsLocale();
  return dayjs(timestamp).fromNow();
}

export function fromNowUnix(unixTime: any) {
  if (!unixTime) return;
  syncDayjsLocale();
  return dayjs.unix(Number.parseInt(unixTime)).fromNow();
}

export { dayjs };
