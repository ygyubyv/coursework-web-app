export const Roles = {
  user: "User",
  admin: "Administrator",
  guardian: "Guardian",
  owner: "Owner",
};

export type Role = keyof typeof Roles;
