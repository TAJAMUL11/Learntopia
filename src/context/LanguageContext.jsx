import React, { createContext, useContext, useState, useEffect } from 'react';
import { LANGUAGES, translations } from '../i18n/translations';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [currentLang, setCurrentLang] = useState(() => {
    const saved = localStorage.getItem('learntopia_lang');
    if (saved && translations[saved]) {
      return saved;
    }
    return 'en';
  });

  const activeLangObj = LANGUAGES.find(l => l.code === currentLang) || LANGUAGES[0];
  const isRTL = activeLangObj.dir === 'rtl';

  useEffect(() => {
    localStorage.setItem('learntopia_lang', currentLang);
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    document.documentElement.lang = currentLang;
  }, [currentLang, isRTL]);

  const setLanguage = (code) => {
    if (translations[code]) {
      setCurrentLang(code);
    }
  };

  /**
   * Helper function to fetch nested translation string by key path
   * e.g., t('nav.home') => "Home" or "Inicio"
   */
  const t = (path) => {
    if (!path) return '';
    const keys = path.split('.');
    
    // Search in active language dictionary
    let result = translations[currentLang];
    for (const key of keys) {
      if (result && result[key] !== undefined) {
        result = result[key];
      } else {
        result = null;
        break;
      }
    }

    if (result !== null && typeof result === 'string') {
      return result;
    }

    // Fallback to English dictionary if key is missing in active language
    let fallback = translations['en'];
    for (const key of keys) {
      if (fallback && fallback[key] !== undefined) {
        fallback = fallback[key];
      } else {
        fallback = path; // Return key path itself if not found
        break;
      }
    }

    return typeof fallback === 'string' ? fallback : path;
  };

  return (
    <LanguageContext.Provider value={{ currentLang, setLanguage, languages: LANGUAGES, activeLangObj, isRTL, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
