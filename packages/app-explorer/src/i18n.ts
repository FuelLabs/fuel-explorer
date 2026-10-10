import { syncDayjsLocale } from 'app-commons';
import i18next from 'i18next';
import HttpBackend from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';
import {
  type Locale,
  bundledLocales,
  localeLoaders,
  locales,
} from './locales/locales';
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

async function loadLocale(lng: string) {
  if (!(lng in localeLoaders)) return;
  if (i18next.hasResourceBundle(lng, 'translation')) return;
  const loader = localeLoaders[lng as keyof typeof localeLoaders];
  const mod = await loader();
  i18next.addResourceBundle(lng, 'translation', mod.default, true, true);
}

applyDocumentLanguage(defaultLanguage);
syncDayjsLocale(defaultLanguage);

// English is the only bundled language, so init always starts on it. The stored
// language is fetched and activated before `i18nReady` resolves, and main.tsx
// renders after that: no English flash for returning visitors.
const initialized = i18next
  .use(HttpBackend)
  .use(initReactI18next)
  .init({
    resources: bundledLocales,
    lng: 'en',
    fallbackLng: 'en',
    partialBundledLanguages: true,
    interpolation: { escapeValue: false },
    backend: { loadPath: '/locales/{{lng}}/{{ns}}.json' },
    react: { useSuspense: true },
  });

// A language is fetched before it becomes active, so switching never renders
// the English fallback.
const changeLanguage = i18next.changeLanguage.bind(i18next);
i18next.changeLanguage = async (lng, callback) => {
  if (lng) await loadLocale(lng).catch(() => undefined);
  return changeLanguage(lng, callback);
};

export const i18nReady: Promise<unknown> = initialized
  .then(() => loadLocale(defaultLanguage).catch(() => undefined))
  .then(() =>
    defaultLanguage === 'en' ? undefined : changeLanguage(defaultLanguage),
  )
  .then(() => {
    // Registered after startup so the initial English init cannot overwrite
    // the stored language.
    i18next.on('languageChanged', (lng: string) => {
      localStorage.setItem(LANGUAGE_KEY, lng);
      applyDocumentLanguage(lng);
      syncDayjsLocale(lng);
    });
  });

installLanguageScramble(i18next);

export default i18next;
