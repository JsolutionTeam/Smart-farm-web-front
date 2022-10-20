import { useState, useEffect, useCallback, useRef } from "react";
import { apiRoute, requestSecureGet } from "@lib/api";
import useToken from "@hooks/useToken";
import ListSelect from "../ListSelect";
import { ListTypes } from "@typedef/components/Common/CSelect/list.types";
import useSelected from "@hooks/useSelected";

const ListSelectContainer = () => {
  const { getToken } = useToken();
  const { getSelected, setSelected, clearSelected } = useSelected();
  const [visibleOption, setVisibleOption] = useState<boolean>(false);
  const [options, setOptions] = useState<ListTypes[]>([]);
  const selectRef = useRef<HTMLElement>(null);

  const onClickSelected = () => {
    setVisibleOption((visibleOption) => !visibleOption);
  };

  const onChangeSelect = (selected: ListTypes) => {
    setSelected(selected);
    setVisibleOption(false);
  };

  const resetSelect = () => {
    clearSelected();
    setVisibleOption(false);
  };

  const getOptions = useCallback(async () => {
    console.log("getOptions 실행");
    const { config, data } = await requestSecureGet<ListTypes[]>(
      apiRoute.site + "list",
      {},
      getToken()!
    );
    if (config.status >= 200 && config.status < 400) {
      setOptions(data);
    }
  }, [getToken]);

  const optionHandler = useCallback(
    (e: MouseEvent) => {
      if (visibleOption) {
        if (!selectRef.current?.contains(e.target as Node)) {
          setVisibleOption(false);
        }
      }
    },
    [visibleOption]
  );

  useEffect(() => {
    window.addEventListener("click", optionHandler);
    return () => {
      window.removeEventListener("click", optionHandler);
    };
  }, [optionHandler]);

  useEffect(() => {
    getOptions();
  }, [getOptions]);

  return (
    <ListSelect
      visibleOption={visibleOption}
      selected={getSelected().name}
      onClickSelected={onClickSelected}
      options={options}
      onChangeSelect={onChangeSelect}
      resetSelect={resetSelect}
      selectRef={selectRef}
    />
  );
};

export default ListSelectContainer;
