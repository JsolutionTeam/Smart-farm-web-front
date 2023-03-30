import React, { useState, useEffect, useRef } from "react";
import SiteSelect from "../SiteSelect";
import useAxios from "@hooks/useAxios";
import useSite from "@hooks/store/useSite";
import { SiteTypes } from "@store/site/actions";

const SiteSelectContainer = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { response: sites, requestApi } = useAxios<SiteTypes[]>();
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

  useEffect(() => {
    requestApi("GET", "/v1/site/list");
  }, []);

  return (
    <SiteSelect
      sites={sites ?? []}
      isVisible={isVisible}
      visibleHandler={visibleHandler}
      selectedSite={selectedSite}
      onClickSite={onClickSite}
      onClickClear={onClickClear}
      selectRef={selectRef}
    />
  );
};

export default SiteSelectContainer;
