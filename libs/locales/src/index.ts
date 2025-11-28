// Internationalization utilities and locale management
// This is a placeholder implementation

export interface Locale {
  code: string;
  name: string;
  direction: 'ltr' | 'rtl';
}

export const DEFAULT_LOCALE = 'en';

export const SUPPORTED_LOCALES: Locale[] = [
  { code: 'en', name: 'English', direction: 'ltr' },
  { code: 'fr', name: 'Français', direction: 'ltr' },
  { code: 'es', name: 'Español', direction: 'ltr' },
];

export function getLocale(code: string): Locale | undefined {
  return SUPPORTED_LOCALES.find(locale => locale.code === code);
}

export function isValidLocale(code: string): boolean {
  return SUPPORTED_LOCALES.some(locale => locale.code === code);
}

export function getCurrentLocale(): string {
  if (typeof window !== 'undefined') {
    return window.navigator.language.split('-')[0] || DEFAULT_LOCALE;
  }
  return DEFAULT_LOCALE;
} 