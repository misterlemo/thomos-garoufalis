import { createContext, useContext, useEffect, useState } from 'react';
import { translations } from './translations';

export const LANGUAGES = [
  { code: 'el', label: 'ΕΛ', name: 'Ελληνικά' },
  { code: 'en', label: 'EN', name: 'English' },
  { code: 'ka', label: 'ქა', name: 'ქართული' },
  { code: 'sq', label: 'SQ', name: 'Shqip' },
];

const STORAGE_KEY = 'tg-lang';

const LanguageContext = createContext();

export const useLanguage = () => useContext(LanguageContext);

const initialLanguage = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && translations[saved]) return saved;
  } catch {
    // storage unavailable — fall through to default
  }
  return 'el';
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(initialLanguage);
  const t = translations[language];

  useEffect(() => {
    document.documentElement.lang = language;
    document.title = t.metaTitle;
    try {
      localStorage.setItem(STORAGE_KEY, language);
    } catch {
      // ignore
    }
  }, [language, t]);

  return (
    <LanguageContext.Provider value={{ language, t, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};
