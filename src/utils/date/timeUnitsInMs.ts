/**
 * Returns common time units expressed in milliseconds.
 *
 * @returns An object containing the number of milliseconds for each unit:
 * - second: 1000
 * - minute: 60,000
 * - hour: 3,600,000
 * - day: 86,400,000
 * - week: 604,800,000
 * - month: 2,592,000,000 (30 days)
 * - year: 31,536,000,000 (365 days)
 *
 * @example
 * const { day, week } = timeUnitsInMs();
 */

export const timeUnitsInMs = () => {
  const second = 1 * 1000;
  const minute = 60 * second;
  const hour = 60 * minute;
  const day = 24 * hour;
  const week = 7 * day;
  const month = 30 * day;
  const year = 365 * day;

  return {
    second,
    minute,
    hour,
    day,
    week,
    month,
    year,
  };
};
