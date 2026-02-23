import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enTranslation from "../locales/en/translation.json";
import jaTranslation from "../locales/ja/translation.json";

const supportedLngs = {
  en: "English",
  ja: "日本語",
};

i18n.use(initReactI18next).init({
  fallbackLng: "en",
  supportedLngs: Object.keys(supportedLngs),
  debug: process.env.NODE_ENV === "development",
  saveMissing: true,
  returnNull: false,
  missingKeyHandler: (lng, ns, key) => {
    console.warn(`Missing translation: ${lng}:${ns}:${key}`);
  },
  interpolation: {
    escapeValue: false, // not needed for react as it escapes by default
  },
  resources: {
    ja: {
      translation: jaTranslation,
    },
    en: {
      translation: enTranslation,
    },
  },
});

export default i18n;
export { supportedLngs };
