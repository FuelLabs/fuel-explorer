import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);

export function fromNow(timestamp: string) {
  return dayjs.unix(Number(timestamp)).fromNow();
}

export function unixTimestamp(timestamp: number) {
  return dayjs(timestamp).unix().toString();
}

export { dayjs };
