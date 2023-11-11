import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import { PageBlockLocales } from "#blocks-locales";

const resources = {
  bg: {
    "page-block": PageBlockLocales.bg,
  },
  en: {
    "page-block": PageBlockLocales.en,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  fallbackLng: "bg",
  interpolation: {
    escapeValue: false,
  },
});
