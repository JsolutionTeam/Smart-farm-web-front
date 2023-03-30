import { SiteActionType, SiteTypes } from "./actions";

export type SiteState = SiteTypes | null;

const reducer = (state: SiteState = null, { type, site }: SiteActionType) => {
  switch (type) {
    case "SET":
      return site;
    case "CLEAR":
      return site;
    default:
      return state;
  }
};

export default reducer;
