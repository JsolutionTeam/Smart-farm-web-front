import { useState, useEffect, useRef } from "react";
import SiteSelect from "../SiteSelect";
import useLocalStorage from "@hooks/useLocalStorage";
import useSite from "@hooks/store/useSite";
import { requestSecureGet } from "@lib/api";
import { SiteTypes } from "@store/site/actions";

const SiteSelectContainer = () => {
  const { getToken } = useLocalStorage();
  const [isVisible, setIsVisible] = useState(false);
  const [sites, setSites] = useState<SiteTypes[]>([]);
  const { selectedSite, __siteSetActionFromHooks, __siteClearActionFromHooks } =
    useSite();
  const selectRef = useRef<HTMLDivElement>(null);

  const visibleHandler = (visible: boolean) => {
    setIsVisible(visible);
  };

  // site 선택 시
  const onClickSite = (site: SiteTypes) => {
    __siteSetActionFromHooks(site);
    setIsVisible(false);
  };

  // "농가선택" 선택 시 (clear)
  const onClickClear = () => {
    __siteClearActionFromHooks();
    setIsVisible(false);
  };

  const getSites = async () => {
    const { config, data } = await requestSecureGet<SiteTypes[]>(
      "/v1/site/list",
      {},
      getToken()!
    );

    if (config.status >= 200 && config.status < 400) {
      setSites(data);
    }
  };

  useEffect(() => {
    getSites();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SiteSelect
      isVisible={isVisible}
      visibleHandler={visibleHandler}
      sites={sites ?? []}
      selectedSite={selectedSite}
      onClickSite={onClickSite}
      onClickClear={onClickClear}
      selectRef={selectRef}
    />
  );
};

export default SiteSelectContainer;
