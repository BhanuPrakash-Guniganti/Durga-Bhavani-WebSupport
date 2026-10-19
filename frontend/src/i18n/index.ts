import i18n from 'i18next';
import { initReactI18next, useTranslation } from 'react-i18next';
import enCommon from '../locales/en/common.json';
import teCommon from '../locales/te/common.json';
import type { LocalizedString, LocalizedArray } from '../types';

import { safeStorage } from '../utils/storage';

export const LANGUAGE_STORAGE_KEY = 'durga_bhavani_language';

export type SupportedLanguage = 'en' | 'te';

// Detect initial language: localStorage preference if available, else 'en'
const getInitialLanguage = (): SupportedLanguage => {
  const saved = safeStorage.getItem(LANGUAGE_STORAGE_KEY);
  if (saved === 'te' || saved === 'en') {
    return saved;
  }
  return 'en';
};

const initialLang = getInitialLanguage();

// Apply document language attribute on initialization
if (typeof document !== 'undefined') {
  document.documentElement.lang = initialLang;
  document.documentElement.setAttribute('data-lang', initialLang);
}

i18n.use(initReactI18next).init({
  resources: {
    en: { common: enCommon },
    te: { common: teCommon }
  },
  lng: initialLang,
  fallbackLng: 'en',
  defaultNS: 'common',
  ns: ['common'],
  interpolation: {
    escapeValue: false // React already escapes values
  }
});

// Sync document element attributes on language change
i18n.on('languageChanged', (lng: string) => {
  if (typeof document !== 'undefined') {
    document.documentElement.lang = lng;
    document.documentElement.setAttribute('data-lang', lng);
  }
  safeStorage.setItem(LANGUAGE_STORAGE_KEY, lng);
});

export default i18n;

/**
 * Helper to safely extract localized content from a LocalizedString or fallback string.
 * Fallback policy:
 * 1. Return field[lang] if non-empty string.
 * 2. Fall back to field['en'] if non-empty.
 * 3. Fall back to field['te'] if non-empty.
 * 4. Return empty string if neither is available.
 */
export function getLocalized(
  field: LocalizedString | string | undefined | null,
  lang: string = i18n.language || 'en'
): string {
  if (!field) return '';
  if (typeof field === 'string') return field;
  const currentLang = (lang === 'te' ? 'te' : 'en') as SupportedLanguage;
  if (field[currentLang] && field[currentLang].trim().length > 0) {
    return field[currentLang];
  }
  // Clear fallback policy
  if (field.en && field.en.trim().length > 0) {
    return field.en;
  }
  if (field.te && field.te.trim().length > 0) {
    return field.te;
  }
  return '';
}

/**
 * Helper to extract localized string array.
 */
export function getLocalizedArray(
  field: LocalizedArray | string[] | undefined | null,
  lang: string = i18n.language || 'en'
): string[] {
  if (!field) return [];
  if (Array.isArray(field)) return field;
  const currentLang = (lang === 'te' ? 'te' : 'en') as SupportedLanguage;
  if (field[currentLang] && field[currentLang].length > 0) {
    return field[currentLang];
  }
  if (field.en && field.en.length > 0) {
    return field.en;
  }
  if (field.te && field.te.length > 0) {
    return field.te;
  }
  return [];
}

/**
 * Hook to access active language and language switching functionality.
 */
export function useAppLanguage() {
  const { t, i18n: currentI18n } = useTranslation('common');
  const currentLang = (currentI18n.language === 'te' ? 'te' : 'en') as SupportedLanguage;

  const setLanguage = (lang: SupportedLanguage) => {
    currentI18n.changeLanguage(lang);
  };

  const toggleLanguage = () => {
    const next = currentLang === 'en' ? 'te' : 'en';
    setLanguage(next);
  };

  return {
    t,
    currentLang,
    isTelugu: currentLang === 'te',
    isEnglish: currentLang === 'en',
    setLanguage,
    toggleLanguage,
    getLocalized: (field: LocalizedString | string | undefined | null) =>
      getLocalized(field, currentLang),
    getLocalizedArray: (field: LocalizedArray | string[] | undefined | null) =>
      getLocalizedArray(field, currentLang)
  };
}
