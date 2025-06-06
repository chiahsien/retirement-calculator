// src/i18n/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import zh from './zh.json';
import en from './en.json';

i18n
    .use(initReactI18next)
    .init({
        resources: {
            en: { translation: en },
            zh: { translation: zh },
        },
        lng: navigator.language.includes('zh') ? 'zh' : 'en', // Default to browser language
        fallbackLng: 'en', // Fallback to English if translation missing
        interpolation: { escapeValue: false }, // React handles escaping
    });

export default i18n;
