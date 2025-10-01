/**
 * Converts a Unix timestamp to a `YYYY-MM-DD` formatted string.
 *
 * @param ms - The date to format in Unix timestamp (milliseconds).
 * @returns A string in `YYYY-MM-DD` format.
 *
 * @example
 * formatToYYYYMMDD(1755851392346) // "2025-08-22"
 */

export const formatToYYYYMMDD = (ms: number) => {
  const date = new Date(ms);
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
};
