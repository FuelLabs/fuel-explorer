import type { Resource } from 'i18next';
import en from './en.json';

// English is bundled (it is the fallback). The other languages are separate
// chunks, fetched only when the stored or selected language needs them.
export const bundledLocales = {
  en: { translation: en },
} satisfies Resource;

export const localeLoaders = {
  ja: () => import('./ja.json'),
  ko: () => import('./ko.json'),
  'zh-CN': () => import('./zh-cn.json'),
  'zh-HK': () => import('./zh-hk.json'),
} as const;

export type Locale = 'en' | keyof typeof localeLoaders;

export const locales: Record<Locale, true> = {
  en: true,
  ja: true,
  ko: true,
  'zh-CN': true,
  'zh-HK': true,
};
