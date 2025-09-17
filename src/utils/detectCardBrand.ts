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
