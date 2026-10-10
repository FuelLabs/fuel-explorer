import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import { getI18n } from 'react-i18next';

dayjs.extend(duration);

export function formatSecondsToETA(
  etaSeconds: number,
  prefix = '',
): string | undefined {
  if (!etaSeconds || etaSeconds <= 0) return;
  if (etaSeconds < 60) {
    return getI18n().t('staking.eta.less_than_minute');
  }

  const dur = dayjs.duration(etaSeconds, 'seconds'); // Convert seconds to milliseconds
  const days = dur.days();
  const hours = dur.hours();
  const minutes = dur.minutes();

  // Called from hooks and services too, so it reads the shared i18next
  // instance instead of useTranslation.
  const { t } = getI18n();
  const parts: string[] = [];

  if (days > 0) {
    parts.push(t('staking.eta.days', { count: days }));
  }
  if (hours > 0) {
    parts.push(t('staking.eta.hours', { count: hours }));
  }
  if (minutes > 0 && days === 0) {
    parts.push(t('staking.eta.minutes', { count: minutes }));
  }

  if (parts.length === 1) {
    return `${prefix}${parts[0]}`;
  }
  if (parts.length === 2) {
    return `${prefix}${t('staking.eta.join', { first: parts[0], second: parts[1] })}`;
  }
}
