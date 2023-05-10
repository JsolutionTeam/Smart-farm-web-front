import { SiteActionType, SiteTypes } from "./actions";

const reducer = (
  state: SiteTypes | null = null,
  { type, site }: SiteActionType
) => {
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
