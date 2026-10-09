import { syncDayjsLocale } from 'app-commons/src/utils/dayjs';
import i18next from 'i18next';
import HttpBackend from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';
import { type Locale, locales } from './locales/locales';
import { installLanguageScramble } from './systems/Core/utils/languageScramble';

const LANGUAGE_KEY = 'fuel-explorer-language';
const savedLanguage = localStorage.getItem(LANGUAGE_KEY) as Locale;
const defaultLanguage = locales[savedLanguage] ? savedLanguage : 'en';

function documentLanguage(lng: string): Locale {
  const codes = Object.keys(locales) as Locale[];
  return codes.find((code) => code.toLowerCase() === lng.toLowerCase()) ?? 'en';
}

function applyDocumentLanguage(lng: string) {
  if (typeof document === 'undefined') return;
  document.documentElement.lang = documentLanguage(lng);
}

applyDocumentLanguage(defaultLanguage);
syncDayjsLocale(defaultLanguage);

i18next
  .use(HttpBackend)
  .use(initReactI18next)
  .init({
    resources: locales,
    lng: defaultLanguage,
    fallbackLng: 'en',
    partialBundledLanguages: true,
    interpolation: { escapeValue: false },
    backend: { loadPath: '/locales/{{lng}}/{{ns}}.json' },
    react: { useSuspense: true },
  });

i18next.on('languageChanged', (lng: string) => {
  localStorage.setItem(LANGUAGE_KEY, lng);
  applyDocumentLanguage(lng);
  syncDayjsLocale(lng);
});

installLanguageScramble(i18next);

export default i18next;
