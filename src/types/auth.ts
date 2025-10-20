import type { IdTokenClaims } from "@azure/msal-browser";

export type IdTokenClaimsExtended = IdTokenClaims & {
  extension_Role: string;
};
