import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

dayjs.extend(duration);

export function formatSecondsToETA(
  etaSeconds: number,
  prefix = '',
): string | undefined {
  if (!etaSeconds || etaSeconds <= 0) return;
  if (etaSeconds < 60) {
    return 'less than 1 minute';
  }

  const dur = dayjs.duration(etaSeconds, 'seconds'); // Convert seconds to milliseconds
  const days = dur.days();
  const hours = dur.hours();
  const minutes = dur.minutes();

  const parts: string[] = [];

  if (days > 0) {
    parts.push(`${days} day${days > 1 ? 's' : ''}`);
  }
  if (hours > 0 && days === 0) {
    parts.push(`${hours} hour${hours > 1 ? 's' : ''}`);
  }
  if (days === 0 && hours < 1 && minutes > 0) {
    parts.push(`${minutes} minute${minutes > 1 ? 's' : ''}`);
  }

  if (parts.length === 1) {
    return `${prefix}${parts[0]}`;
  }
  if (parts.length === 2) {
    return `${prefix}${parts[0]} and ${parts[1]}`;
  }
  if (parts.length === 3) {
    return `${prefix}${parts[0]}, ${parts[1]} and ${parts[2]}`;
  }
}
