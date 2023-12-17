import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import {
  LoginBlockLocales,
  PageBlockLocales,
  RegisterBlockLocales,
} from "#blocks-locales";

const resources = {
  bg: {
    "page-block": PageBlockLocales.bg,
    "login-block": LoginBlockLocales.bg,
    "register-block": RegisterBlockLocales.bg,
  },
  en: {
    "page-block": PageBlockLocales.en,
    "login-block": LoginBlockLocales.en,
    "register-block": RegisterBlockLocales.en,
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
