export type SiteTypes = {
  id: number;
  name: string;
};

const SET = "SET";
const CLEAR = "CLEAR";

export const setSite = (site: SiteTypes) => {
  return {
    type: SET,
    site: site,
  };
};

export const clearSite = () => {
  return {
    type: CLEAR,
    site: null,
  };
};

export type SiteActionType =
  | ReturnType<typeof setSite>
  | ReturnType<typeof clearSite>;
