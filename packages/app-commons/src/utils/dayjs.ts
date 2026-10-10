import dayjs from 'dayjs';
import englishLocale from 'dayjs/locale/en.js';
import jaLocale from 'dayjs/locale/ja.js';
import koLocale from 'dayjs/locale/ko.js';
import zhCnLocale from 'dayjs/locale/zh-cn.js';
import zhHkLocale from 'dayjs/locale/zh-hk.js';
import relativeTime from 'dayjs/plugin/relativeTime';
import { getI18n } from 'react-i18next';

const RELATIVE_TIME = {
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
};

const DAYJS_LOCALE: Record<string, string> = {
  en: 'en',
  ja: 'ja',
  ko: 'ko',
  'zh-CN': 'zh-cn',
  'zh-HK': 'zh-hk',
};

let pluginsReady = false;
let listening = false;

// Keeps dayjs on the active language without every caller syncing it.
function listenForLanguageChanges() {
  const i18n = getI18n();
  if (listening || !i18n) return;
  listening = true;
  i18n.on('languageChanged', (lng: string) => {
    dayjs.locale(DAYJS_LOCALE[lng] ?? 'en');
  });
}

function ensurePlugins() {
  if (pluginsReady) return;
  dayjs.extend(relativeTime);
  for (const locale of [jaLocale, koLocale, zhCnLocale, zhHkLocale]) {
    dayjs.locale(locale, undefined, true);
  }
  dayjs.locale('en', { ...englishLocale, relativeTime: RELATIVE_TIME }, true);
  pluginsReady = true;
}

export function syncDayjsLocale(language?: string) {
  ensurePlugins();
  listenForLanguageChanges();
  const lng = language || getI18n()?.language || 'en';
  dayjs.locale(DAYJS_LOCALE[lng] ?? 'en');
}

export function intlLanguage(language?: string) {
  const lng = language || getI18n()?.language || 'en';
  if (lng === 'zh-cn') return 'zh-CN';
  if (lng === 'zh-hk') return 'zh-HK';
  return lng;
}

export function createDayjs() {
  syncDayjsLocale();
  return dayjs;
}

export type DateInput =
  | Date
  | number
  | string
  | { toDate(): Date }
  | null
  | undefined;
export type DateStyle = 'short' | 'medium' | 'long';

function toDate(input: DateInput): Date | null {
  if (input == null || input === '') return null;
  const date =
    typeof input === 'object' && 'toDate' in input
      ? input.toDate()
      : new Date(input);
  return Number.isNaN(date.getTime()) ? null : date;
}

/** A calendar date in the active language, for example "Oct 9, 2026". */
export function formatDate(
  date: DateInput,
  style: DateStyle = 'medium',
  language?: string,
) {
  const value = toDate(date);
  if (!value) return '';
  return new Intl.DateTimeFormat(intlLanguage(language), {
    dateStyle: style,
  }).format(value);
}

/** A date and time in the active language, in the viewer's time zone. */
export function formatDateTime(
  date: DateInput,
  style: DateStyle = 'medium',
  language?: string,
) {
  const value = toDate(date);
  if (!value) return '';
  return new Intl.DateTimeFormat(intlLanguage(language), {
    dateStyle: style,
    timeStyle: 'short',
  }).format(value);
}

/** Full date and time with seconds and the time zone name, for `title` text. */
export function formatDateTimeTitle(date: DateInput, language?: string) {
  const value = toDate(date);
  if (!value) return '';
  return new Intl.DateTimeFormat(intlLanguage(language), {
    dateStyle: 'medium',
    timeStyle: 'long',
  }).format(value);
}

const RELATIVE_UNITS: Array<[Intl.RelativeTimeFormatUnit, number]> = [
  ['year', 365 * 24 * 3600],
  ['month', 30 * 24 * 3600],
  ['day', 24 * 3600],
  ['hour', 3600],
  ['minute', 60],
  ['second', 1],
];

/** "5 minutes ago" or "in 2 hours" in the active language. */
export function formatRelative(
  date: DateInput,
  now: number = Date.now(),
  language?: string,
) {
  const value = toDate(date);
  if (!value) return '';
  const seconds = Math.round((value.getTime() - now) / 1000);
  const abs = Math.abs(seconds);
  const [unit, size] =
    RELATIVE_UNITS.find(([, size]) => abs >= size) ?? RELATIVE_UNITS[5];
  return new Intl.RelativeTimeFormat(intlLanguage(language), {
    numeric: 'auto',
  }).format(Math.trunc(seconds / size), unit);
}
