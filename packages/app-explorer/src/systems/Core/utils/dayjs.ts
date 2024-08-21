import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);

export function fromNow(timestamp: string) {
  return dayjs(timestamp).fromNow();
}

export function fromNowUnix(unixTime: any) {
  if (!unixTime) return;
  return dayjs.unix(parseInt(unixTime)).fromNow();
}

export { dayjs };
