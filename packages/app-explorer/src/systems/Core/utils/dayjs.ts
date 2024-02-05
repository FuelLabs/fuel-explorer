import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

export function fromNow(timestamp: string) {
  return dayjs(timestamp).fromNow();
}

export { dayjs };
