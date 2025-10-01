/**
 * Formats a given or current timestamp into `HH:mm`.
 *
 * @param now - Optional timestamp in milliseconds.
 *              If omitted, current time will be used.
 * @returns A string in `HH:mm` format.
 *
 * @example
 * formatToHHmm()                 // "14:05"
 * formatToHHmm(Date.now() + 3600000) // "15:05"
 */
export const formatToHHmm = (now?: number) => {
  const date = new Date(now ?? Date.now());
  const h = String(date.getHours()).padStart(2, "0");
  const m = String(date.getMinutes()).padStart(2, "0");
  return `${h}:${m}`;
};
