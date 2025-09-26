import { useI18n } from "vue-i18n";

type Locale = "en" | "uk";

export const useLocalization = () => {
  const { availableLocales, locale } = useI18n();

  const selectLocale = (l: Locale) => {
    localStorage.setItem("locale", l);
    locale.value = l;
  };

  return {
    locale,
    availableLocales,
    selectLocale,
  };
};
