import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import {
  LoginBlockLocales,
  PageBlockLocales,
  RegisterBlockLocales,
  UserProfileBlockLocales,
  AddProductBlockLocales,
  ProductBlockLocales,
  LandingBlockLocales,
  ShopBlockLocales,
  CartBlockLocales,
  CheckoutBlockLocales,
} from "#blocks-locales";

const resources = {
  bg: {
    "page-block": PageBlockLocales.bg,
    "login-block": LoginBlockLocales.bg,
    "register-block": RegisterBlockLocales.bg,
    "user-profile-block": UserProfileBlockLocales.bg,
    "add-product-block": AddProductBlockLocales.bg,
    "product-block": ProductBlockLocales.bg,
    "landing-block": LandingBlockLocales.bg,
    "shop-block": ShopBlockLocales.bg,
    "cart-block": CartBlockLocales.bg,
    "checkout-block": CheckoutBlockLocales.bg,
  },
  en: {
    "page-block": PageBlockLocales.en,
    "login-block": LoginBlockLocales.en,
    "register-block": RegisterBlockLocales.en,
    "user-profile-block": UserProfileBlockLocales.en,
    "add-product-block": AddProductBlockLocales.en,
    "product-block": ProductBlockLocales.en,
    "landing-block": LandingBlockLocales.en,
    "shop-block": ShopBlockLocales.en,
    "cart-block": CartBlockLocales.en,
    "checkout-block": CheckoutBlockLocales.en,
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
