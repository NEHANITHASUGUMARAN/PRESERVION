import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    // Check localStorage first, then default to English
    return localStorage.getItem('selectedLanguage') || 'en';
  });
  const [showLanguagePopup, setShowLanguagePopup] = useState(() => {
    // Show popup on every page refresh
    return true;
  });

  useEffect(() => {
    localStorage.setItem('selectedLanguage', language);
  }, [language]);

  const changeLanguage = (newLanguage) => {
    setLanguage(newLanguage);
    setShowLanguagePopup(false);
  };

  const value = {
    language,
    changeLanguage,
    showLanguagePopup,
    setShowLanguagePopup
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};
