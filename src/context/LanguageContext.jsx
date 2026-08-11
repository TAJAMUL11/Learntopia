import { createContext, useContext, useState, useEffect } from 'react';
import { LANGUAGES, translations } from '../i18n/translations';
import { contentTranslations } from '../i18n/contentTranslations';

const LanguageContext = createContext();

// Deep-merge the bulk course/quiz content translations (kept in their own file
// to keep translations.js manageable) onto the base UI dictionaries. A deep
// merge (objects by key, arrays by index) lets the content file add ONLY the
// deep lesson content (contentSections/exercises) onto the course metadata that
// already lives in translations.js, without duplicating it. English is omitted:
// t() and the localization utils fall back to English / the raw data files.
const isPlainObject = (v) => v && typeof v === 'object' && !Array.isArray(v);

const deepMerge = (base, extra) => {
  if (Array.isArray(base) && Array.isArray(extra)) {
    const out = base.slice();
    extra.forEach((item, i) => {
      out[i] = (isPlainObject(out[i]) && isPlainObject(item)) || (Array.isArray(out[i]) && Array.isArray(item))
        ? deepMerge(out[i], item)
        : item;
    });
    return out;
  }
  if (isPlainObject(base) && isPlainObject(extra)) {
    const out = { ...base };
    for (const key of Object.keys(extra)) {
      out[key] = key in base ? deepMerge(base[key], extra[key]) : extra[key];
    }
    return out;
  }
  return extra;
};

const mergedTranslations = Object.keys(translations).reduce((acc, lang) => {
  acc[lang] = deepMerge(translations[lang], contentTranslations[lang] || {});
  return acc;
}, {});

export const LanguageProvider = ({ children }) => {
  const [currentLang, setCurrentLang] = useState(() => {
    const saved = localStorage.getItem('learntopia_lang');
    // Only restore languages that are currently exposed in the dropdown, so a
    // hidden/removed language saved earlier can't get stuck active.
    if (saved && LANGUAGES.some((l) => l.code === saved)) {
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
    if (LANGUAGES.some((l) => l.code === code)) {
      setCurrentLang(code);
    }
  };

  /**
   * Helper function to fetch nested translation string by key path with optional interpolation parameters
   * e.g., t('quiz.questionCount', { current: 1, total: 10 }) => "Question 1 of 10"
   */
  const t = (path, params = {}) => {
    if (!path) return '';
    const keys = path.split('.');
    
    // Search in active language dictionary
    let result = mergedTranslations[currentLang];
    for (const key of keys) {
      if (result && result[key] !== undefined) {
        result = result[key];
      } else {
        result = null;
        break;
      }
    }

    if (result === null || typeof result !== 'string') {
      // Fallback to English dictionary if key is missing in active language
      let fallback = mergedTranslations['en'];
      for (const key of keys) {
        if (fallback && fallback[key] !== undefined) {
          fallback = fallback[key];
        } else {
          fallback = path; // Return key path itself if not found
          break;
        }
      }
      result = typeof fallback === 'string' ? fallback : path;
    }

    if (typeof result === 'string' && params && typeof params === 'object') {
      Object.keys(params).forEach(paramKey => {
        result = result.replace(new RegExp(`\\{${paramKey}\\}`, 'g'), params[paramKey]);
      });
    }

    return result;
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
