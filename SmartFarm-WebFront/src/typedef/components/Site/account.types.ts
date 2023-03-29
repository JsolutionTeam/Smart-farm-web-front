export type AccountTypes = {
  role: "ROLE_ADMIN" | "ROLE_USER";
  site: {
    id: number;
    name: string;
  };
  username: string;
};
