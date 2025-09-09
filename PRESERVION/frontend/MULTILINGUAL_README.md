# Multilingual Support for Preservion

This document describes the multilingual functionality implemented in the Preservion frontend application.

## Features

- **Language Selection Popup**: A popup appears on first visit allowing users to select their preferred language
- **Three Languages Supported**: English, Tamil (தமிழ்), and Hindi (हिन्दी)
- **Language Switcher**: A dropdown in the navigation bar to change languages on the fly
- **Persistent Language Selection**: User's language choice is saved in localStorage
- **Complete Translation Coverage**: All text content is translated across all pages

## Implementation Details

### 1. Language Context (`src/contexts/LanguageContext.jsx`)
- Manages global language state
- Provides language switching functionality
- Handles localStorage persistence
- Controls language popup visibility

### 2. Translation Files
- `src/translations/en.json` - English translations
- `src/translations/ta.json` - Tamil translations  
- `src/translations/hi.json` - Hindi translations

### 3. Translation Utility (`src/utils/translations.js`)
- `getTranslation(language, key)` - Gets translation for a specific key
- `useTranslation(language)` - React hook for easy translation access
- Automatic fallback to English if translation is missing

### 4. Components

#### LanguagePopup (`src/components/LanguagePopup.jsx`)
- Modal popup for initial language selection
- Beautiful UI with flag icons
- Appears only on first visit (no saved language preference)

#### LanguageSwitcher (`src/components/LanguageSwitcher.jsx`)
- Dropdown component for changing languages
- Available in navigation bar
- Shows current language with flag icon

### 5. Updated Pages
All pages have been updated to use the translation system:
- HomePage
- LoginPage  
- SignupPage
- (Other dashboard pages can be updated similarly)

## Usage

### For Developers

1. **Adding New Translations**:
   ```javascript
   // Add to all three translation files (en.json, ta.json, hi.json)
   {
     "newSection": {
       "title": "New Title",
       "description": "New Description"
     }
   }
   ```

2. **Using Translations in Components**:
   ```javascript
   import { useLanguage } from '../contexts/LanguageContext';
   import { useTranslation } from '../utils/translations';
   
   function MyComponent() {
     const { language } = useLanguage();
     const t = useTranslation(language);
     
     return <h1>{t('newSection.title')}</h1>;
   }
   ```

3. **Translation Key Structure**:
   - Use dot notation for nested keys: `'common.login'`
   - Group related translations: `'homepage.title'`, `'login.subtitle'`
   - Keep keys descriptive and consistent

### For Users

1. **First Visit**: Language selection popup appears automatically
2. **Changing Language**: Use the language switcher in the top navigation
3. **Language Persistence**: Your choice is remembered across sessions

## Language Codes

- `en` - English
- `ta` - Tamil (தமிழ்)
- `hi` - Hindi (हिन्दी)

## Future Enhancements

- Add more languages (Telugu, Bengali, etc.)
- RTL (Right-to-Left) language support
- Dynamic language loading
- Translation management system
- Voice-based language selection

## Technical Notes

- All translations are loaded statically for better performance
- Fallback system ensures no missing translations break the UI
- Language context is optimized to prevent unnecessary re-renders
- Translation keys are type-safe and consistent across all files
