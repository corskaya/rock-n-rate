import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enTranslation from '../locales/en/translation.json';
import trTranslation from '../locales/tr/translation.json';

const savedLanguage = localStorage.getItem('lang') || 'en';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: enTranslation,
      },
      tr: {
        translation: trTranslation,
      },
    },
    lng: savedLanguage,
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
