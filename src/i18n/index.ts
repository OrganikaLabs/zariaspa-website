import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import en from "./locales/en.json";
import fa from "./locales/fa.json";
import ps from "./locales/ps.json";
import ar from "./locales/ar.json";
import { localizeDigits } from "./digits";

export const SUPPORTED_LANGS = [
  { code: "en", label: "English", display: "EN", dir: "ltr" as const },
  { code: "fa", label: "Dari", display: "دری", dir: "rtl" as const },
  { code: "ps", label: "Pashto", display: "پښتو", dir: "rtl" as const },
  { code: "ar", label: "Arabic", display: "العربية", dir: "rtl" as const },
];

export const RTL_LANGS = ["fa", "ps", "ar"];

// Convert ASCII digits to native digits for fa/ps/ar after translation.
const digitsPostProcessor = {
  type: "postProcessor" as const,
  name: "localizeDigits",
  process(value: string, _key: string, _opts: unknown, translator: { language?: string }) {
    const lng = translator?.language || i18n.language || "en";
    return localizeDigits(value, lng);
  },
};

if (!i18n.isInitialized) {
  i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .use(digitsPostProcessor)
    .init({
      resources: {
        en: { translation: en },
        fa: { translation: fa },
        ps: { translation: ps },
        ar: { translation: ar },
      },
      fallbackLng: "en",
      supportedLngs: ["en", "fa", "ps", "ar"],
      interpolation: { escapeValue: false },
      postProcess: ["localizeDigits"],
      detection: {
        order: ["localStorage", "navigator", "htmlTag"],
        caches: ["localStorage"],
        lookupLocalStorage: "zariaspa-lang",
      },
    });
}

export default i18n;
