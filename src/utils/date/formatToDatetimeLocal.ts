/**
 * Formats a given or current date into `YYYY-MM-DDTHH:mm` format
 * suitable for `<input type="datetime-local">`.
 *
 * @param date - Optional `Date` object.
 *               If omitted, the current date and time will be used.
 * @returns A string in `YYYY-MM-DD HH:mm` format.
 *
 * @example
 * formatToDatetimeLocal() // "2025-10-20 22:45"
 * formatToDatetimeLocal(new Date(Date.now() + 3600000)) // "2025-10-20 23:45"
 */
export const formatToDatetimeLocal = (date?: Date): string => {
  const d = date ?? new Date();
  const pad = (n: number) => String(n).padStart(2, "0");

  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(
    d.getHours()
  )}:${pad(d.getMinutes())}`;
};
