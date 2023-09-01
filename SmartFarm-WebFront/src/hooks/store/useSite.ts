import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@store/rootReducer";
import { setSite, clearSite, SiteTypes } from "@store/site/actions";

const useSite = () => {
  const selectedSite = useSelector((root: RootState) => root.siteReducer);

  const dispatch = useDispatch();

  const __siteSetActionFromHooks = (site: SiteTypes) => {
    dispatch(setSite(site));
  };

  const __siteClearActionFromHooks = () => {
    dispatch(clearSite());
  };

  return { selectedSite, __siteSetActionFromHooks, __siteClearActionFromHooks };
};

export default useSite;
