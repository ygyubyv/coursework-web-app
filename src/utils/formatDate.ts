/**
 *
 * @param date -The date to format (ISO string or Unix timestamp).
 * @param locale - Optional locale code (e.g. "en-US", "uk-UA") that controls the output language.
 * @example
 * formatDate("2025-08-11T22:36:38Z") // "12 серпня 2025 р."
 */

export const formatDate = (date: string | number, locale?: string) => {
  const language = navigator.language;
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  return new Intl.DateTimeFormat(locale || language, options).format(
    new Date(date)
  );
};
