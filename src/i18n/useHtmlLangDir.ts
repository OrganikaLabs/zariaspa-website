import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { RTL_LANGS } from "./index";

/** Syncs <html lang> and <html dir> with the active i18next language. */
export function useHtmlLangDir() {
  const { i18n } = useTranslation();
  useEffect(() => {
    if (typeof document === "undefined") return;
    const lng = i18n.language || "en";
    const dir = RTL_LANGS.includes(lng) ? "rtl" : "ltr";
    document.documentElement.lang = lng;
    document.documentElement.dir = dir;
  }, [i18n.language]);
}
