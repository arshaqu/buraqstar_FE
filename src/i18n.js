import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
  .use(Backend) // Load translations from external JSON files
  .use(LanguageDetector) // Detect user's language from browser/localStorage
  .use(initReactI18next) // Bind i18next to React
  .init({
    // If a key is missing in the selected language, fall back to English
    // instead of Arabic (prevents "Urdu -> Arabic" surprises).
    fallbackLng: "en",
    // Avoid noisy i18next logs on production builds.
    debug: process.env.NODE_ENV !== "production",
    interpolation: {
      escapeValue: false, // Not needed for React
    },
    backend: {
      loadPath: "/locales/{{lng}}/translation.json", // Path to translation files
    },
  });

export default i18n;
