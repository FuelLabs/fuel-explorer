import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);

export function fromNow(timestamp: string) {
  return dayjs.unix(Number(timestamp)).fromNow();
}

// TODO: add the right date here
export function fullTime(_timestamp: string) {
  return dayjs().format('DD MMM YYYY - HH:mm:ss A');
}

export function unixTimestamp(timestamp: number) {
  return dayjs(timestamp).unix().toString();
}

export { dayjs };
