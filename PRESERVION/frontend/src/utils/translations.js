import enTranslations from '../translations/en.json';
import taTranslations from '../translations/ta.json';
import hiTranslations from '../translations/hi.json';

const translations = {
  en: enTranslations,
  ta: taTranslations,
  hi: hiTranslations
};

export const getTranslation = (language, key) => {
  const keys = key.split('.');
  let translation = translations[language];
  
  for (const k of keys) {
    if (translation && translation[k]) {
      translation = translation[k];
    } else {
      // Fallback to English if translation not found
      translation = translations.en;
      for (const fallbackKey of keys) {
        if (translation && translation[fallbackKey]) {
          translation = translation[fallbackKey];
        } else {
          return key; // Return the key itself if no translation found
        }
      }
      break;
    }
  }
  
  return translation || key;
};

export const useTranslation = (language) => {
  return (key) => getTranslation(language, key);
};
