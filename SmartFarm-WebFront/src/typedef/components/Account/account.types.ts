export type AccountTypes = {
  role: "ROLE_ADMIN" | "ROME_USER";
  site: {
    id: number;
    name: string;
  };
  username: string;
};
