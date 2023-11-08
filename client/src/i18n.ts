import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import { LandingPageHeroBlockLocales, PageBlockLocales, ShopContentLocales } from '#blocks-locales';

const resources = {
  bg: {
    'page-block': PageBlockLocales.bg,
    'landing-page-hero-block': LandingPageHeroBlockLocales.bg,
    'shop-content-block': ShopContentLocales.bg,
  },
  en: {
    'page-block': PageBlockLocales.en,
    'landing-page-hero-block': LandingPageHeroBlockLocales.en,
    'shop-content-block': ShopContentLocales.en,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  fallbackLng: 'bg',
  interpolation: {
    escapeValue: false,
  },
});
