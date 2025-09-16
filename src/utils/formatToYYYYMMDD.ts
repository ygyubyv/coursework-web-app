/**
 * Converts a Unix timestamp to a `YYYYMMDD` formatted string.
 *
 * This format is required for NASA API calls.
 *
 * @param ms - The date to format in Unix timestamp.
 * @returns A string in `YYYYMMDD` format.
 *
 * @example
 * formatToYYYYMMDD(1755851392346) // "20250822"
 */

export const formatToYYYYMMDD = (ms: number) => {
  const date = new Date(ms);
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}${m}${d}`;
};
