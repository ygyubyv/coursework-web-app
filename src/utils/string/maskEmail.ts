/**
 * Masks an email address for privacy.
 *
 * The local part (before @) is partially replaced with asterisks, keeping
 * the first and last character visible when possible.
 *
 * @param email - The email address to mask.
 * @returns The masked email address.
 *
 * @example
 * maskEmail("vasys@example.com") // "v****s@example.com"
 * maskEmail("ab@domain.com")     // "a*@domain.com"
 * maskEmail("a@domain.com")      // "a*@domain.com"
 */

export const maskEmail = (email: string) => {
  const [localPart, domain] = email.split("@");
  if (!localPart || !domain) {
    return email;
  }

  if (localPart.length <= 2) {
    return `${localPart[0] || "*"}*@${domain}`;
  }

  const firstChar = localPart[0];
  const lastChar = localPart[localPart.length - 1];
  const masked = "*".repeat(localPart.length - 2);

  return `${firstChar}${masked}${lastChar}@${domain}`;
};
