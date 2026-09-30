import i18next from 'i18next';
import HttpBackend from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';
import { type Locale, locales } from './locales/locales';

const LANGUAGE_KEY = 'fuel-explorer-language';
const savedLanguage = localStorage.getItem(LANGUAGE_KEY) as Locale;
const defaultLanguage = locales[savedLanguage] ? savedLanguage : 'en';

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
});

export default i18next;
