/**
 * Masks a payment card number (PAN) for privacy, leaving only the last 4 digits visible.
 *
 * All characters except the last four are replaced with asterisks.
 *
 * @param pan - The card number as a string (digits only or with spaces/dashes).
 * @returns The masked card number with only the last four digits visible.
 *
 * @example
 * maskPan("4111111111111111")   // "************1111"
 * maskPan("5500 0000 0000 0004") // "************0004"
 */

export const maskPan = (pan: string) => {
  return pan.replace(/.(?=.{4})/g, "*");
};
