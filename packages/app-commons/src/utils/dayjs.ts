import dayjs from 'dayjs';
import englishLocale from 'dayjs/locale/en.js';
import relativeTime from 'dayjs/plugin/relativeTime';

export function createDayjs() {
  dayjs.extend(relativeTime, {});
  const localeObject = {
    ...englishLocale,
    name: 'fuel',
    relativeTime: {
      future: 'in %s',
      past: '%s ago',
      s: 'less than a minute',
      m: 'a minute',
      mm: '%d minutes',
      h: 'an hour',
      hh: '%d hours',
      d: 'a day',
      dd: '%d days',
      M: 'a month',
      MM: '%d months',
      y: 'a year',
      yy: '%d years',
    },
  };

  dayjs.locale('fuel', localeObject);
  return dayjs;
}
