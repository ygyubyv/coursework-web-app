/**
 *
 * @param date - The date to format (ISO string, Unix timestamp, or Date object).
 * @example
 * formatDateTime("2025-08-11T22:36:38Z") // "12 серпня 2025 р., 01:36"
 */

import { useLocalization } from "@/composables/useLocalization";

export const formatDateTime = (date: string | number | Date) => {
  const { locale } = useLocalization();

  const language = locale.value === "en" ? "en-US" : "uk-UA";
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };

  return new Intl.DateTimeFormat(language, options).format(new Date(date));
};
