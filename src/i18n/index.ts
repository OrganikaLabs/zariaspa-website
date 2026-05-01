import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import en from "./locales/en.json";
import fa from "./locales/fa.json";
import ps from "./locales/ps.json";

export const SUPPORTED_LANGS = [
  { code: "en", label: "English", display: "EN", dir: "ltr" as const },
  { code: "fa", label: "Dari", display: "دری", dir: "rtl" as const },
  { code: "ps", label: "Pashto", display: "پښتو", dir: "rtl" as const },
];

export const RTL_LANGS = ["fa", "ps"];

if (!i18n.isInitialized) {
  i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      resources: {
        en: { translation: en },
        fa: { translation: fa },
        ps: { translation: ps },
      },
      fallbackLng: "en",
      supportedLngs: ["en", "fa", "ps"],
      interpolation: { escapeValue: false },
      detection: {
        order: ["localStorage", "navigator", "htmlTag"],
        caches: ["localStorage"],
        lookupLocalStorage: "zariaspa-lang",
      },
    });
}

export default i18n;
