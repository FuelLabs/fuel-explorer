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
