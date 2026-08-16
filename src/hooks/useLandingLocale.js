import { useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const ENGLISH_LOCALE = 'en';
const POLISH_LOCALE = 'pl';

const useLandingLocale = () => {
  const { i18n } = useTranslation();
  const currentLocale = i18n.resolvedLanguage || ENGLISH_LOCALE;
  const isPolish = currentLocale === POLISH_LOCALE;
  const nextLocale = isPolish ? ENGLISH_LOCALE : POLISH_LOCALE;

  useEffect(() => {
    document.documentElement.lang = currentLocale;
  }, [currentLocale]);

  const handleLocaleChange = useCallback(() => {
    i18n.changeLanguage(nextLocale);
  }, [i18n, nextLocale]);

  return {
    currentLocale,
    nextLocale,
    handleLocaleChange,
  };
};

export default useLandingLocale;
