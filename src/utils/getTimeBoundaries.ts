import { timeUnitsInMs } from "./timeUnitsInMs";

/**
 * Calculates common time boundaries (yesterday, week ago, month ago, etc.)
 * relative to the given timestamp or the current time.
 *
 * @param now - Optional reference timestamp in milliseconds (defaults to current time).
 * @returns An object containing past and future time boundaries in milliseconds.
 *
 * @example
 * getTimeBoundaries(1755851392346)
 * // {
 * //   today: 1755851392346,
 * //   yesterday: 1755764992346,
 * //   weekAgo: 1755249792346,
 * //   monthAgo: 1753267392346,
 * //   yearAgo: 1724315392346,
 * //   tomorrow: 1755937792346,
 * //   nextWeek: 1756452992346,
 * //   nextMonth: 1758435392346,
 * //   nextYear: 1787393392346
 * // }
 */

export const getTimeBoundaries = (now?: number) => {
  const { day, week, month, year } = timeUnitsInMs();

  const today = now || new Date().getTime();
  const yesterday = today - day;
  const weekAgo = today - week;
  const monthAgo = today - month;
  const yearAgo = today - year;

  const tomorrow = today + day;
  const nextWeek = today + week;
  const nextMonth = today + month;
  const nextYear = today + year;

  return {
    today,
    yesterday,
    weekAgo,
    monthAgo,
    yearAgo,
    tomorrow,
    nextWeek,
    nextMonth,
    nextYear,
  };
};
