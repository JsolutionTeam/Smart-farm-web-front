import CSelect from '../CSelect';
import { ContentTypes } from '@typedef/assets/content.types';
import { useState, useEffect, useRef, useCallback } from 'react';

type Props = {
  selected: ContentTypes;
  func: (content: ContentTypes) => void;
};

const CSelectContainer = ({ selected, func }: Props) => {
  const [visibleOption, setVisibleOption] = useState<boolean>(false);
  const selectRef = useRef<HTMLElement>(null);

  const onClickSelected = () => {
    setVisibleOption((visibleOption) => !visibleOption);
  };

  const onChangeSelect = (content: ContentTypes) => {
    func(content);
    setVisibleOption(false);
  };

  const optionHandler = useCallback(
    (e: MouseEvent) => {
      if (visibleOption) {
        if (!selectRef.current?.contains(e.target as Node)) {
          setVisibleOption(false);
        }
      }
    },
    [visibleOption],
  );

  useEffect(() => {
    window.addEventListener('click', optionHandler);
    return () => {
      window.removeEventListener('click', optionHandler);
    };
  }, [optionHandler]);

  return (
    <CSelect
      selected={selected}
      onChangeSelect={onChangeSelect}
      visibleOption={visibleOption}
      onClickSelected={onClickSelected}
      selectRef={selectRef}
    />
  );
};

export default CSelectContainer;
