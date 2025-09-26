import { createI18n } from "vue-i18n";
import en from "./locales/en.json";
import uk from "./locales/uk.json";

import { localeConfig } from "./config.ts";

const { defaultLocale, fallbackLocale } = localeConfig;

const userPreferredLocale = localStorage.getItem("locale");

export const i18n = createI18n({
  legacy: false,
  locale: userPreferredLocale || defaultLocale,
  fallbackLocale: fallbackLocale,
  messages: {
    en,
    uk,
  },
  globalInjection: true,
});
