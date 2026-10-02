import type { Resource } from 'i18next';
import en from './en.json';
import ja from './ja.json';
import ko from './ko.json';
import zhCn from './zh-cn.json';
import zhHk from './zh-hk.json';

export const locales = {
  en: { translation: en },
  ja: { translation: ja },
  ko: { translation: ko },
  'zh-CN': { translation: zhCn },
  'zh-HK': { translation: zhHk },
} satisfies Resource;

export type Locale = keyof typeof locales;
