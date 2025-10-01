/**
 * Parses a comma-separated string of roles into an array of trimmed role strings.
 *
 * Empty strings and extra spaces are removed.
 *
 * @param rolesString - A comma-separated string, e.g. "admin, user, guardian".
 * @returns An array of roles, e.g. ["admin", "user", "guardian"].
 *
 * @example
 * parseRolesFromString("admin, user ,guardian") // ["admin", "user", "guardian"]
 */

export const parseRolesFromString = (rolesString: string): string[] => {
  return rolesString
    .split(",")
    .map((r) => r.trim())
    .filter((r) => r.length > 0);
};

/**
 * Converts an array of roles into a comma-separated string.
 *
 * Each role is trimmed of extra spaces before joining.
 *
 * @param roles - An array of role strings, e.g. ["admin", "user", "guardian"].
 * @returns A comma-separated string of roles, e.g. "admin, user, guardian".
 *
 * @example
 * stringifyRoles(["admin", "user", "guardian"]) // "admin, user, guardian"
 */

export const stringifyRoles = (roles: string[]): string => {
  return roles.map((r) => r.trim()).join(", ");
};
