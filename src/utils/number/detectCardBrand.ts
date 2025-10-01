/**
 * Detects the brand of a credit/debit card based on its number.
 *
 * Currently supports:
 * - VISA: numbers starting with 4
 * - MasterCard: numbers starting with 51-55, 2222-2720
 * - Amex: numbers starting with 34 or 37
 * - Returns "Unknown" for unsupported or invalid prefixes
 *
 * @param number - The card number as a string (digits only, no spaces or dashes).
 * @returns The card brand as a string: "VISA", "MasterCard", "Amex", or "Unknown".
 *
 * @example
 * detectCardBrand("4111111111111111") // "VISA"
 * detectCardBrand("5500000000000004") // "MasterCard"
 * detectCardBrand("340000000000009")  // "Amex"
 * detectCardBrand("1234567890123456") // "Unknown"
 */

export const detectCardBrand = (number: string): string => {
  if (/^4/.test(number)) return "VISA";
  if (
    /^5[1-5]/.test(number) ||
    /^22[2-9]/.test(number) ||
    /^2[3-7]/.test(number)
  )
    return "MasterCard";
  if (/^3[47]/.test(number)) return "Amex";
  return "Unknown";
};
