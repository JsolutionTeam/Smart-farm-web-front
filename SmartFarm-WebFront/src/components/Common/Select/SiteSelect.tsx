import React from "react";
import styled from "styled-components";
import useOutsideClick from "@hooks/useOutsideClick";
import { SiteTypes } from "@store/site/actions";
import { FiChevronDown } from "react-icons/fi";

type Props = {
  isVisible: boolean;
  visibleHandler: (visible: boolean) => void;
  sites: SiteTypes[];
  selectedSite: SiteTypes | null;
  onClickSite: (site: SiteTypes) => void;
  onClickClear: () => void;
  selectRef: React.RefObject<HTMLDivElement>;
};

const SiteSelect = ({
  isVisible,
  visibleHandler,
  sites,
  onClickSite,
  selectedSite,
  onClickClear,
  selectRef,
}: Props) => {
  useOutsideClick({ ref: selectRef, func: () => visibleHandler(false) });

  return (
    <Container ref={selectRef}>
      <Selected onClick={() => visibleHandler(!isVisible)}>
        <p>{selectedSite ? selectedSite.name : "농가선택"}</p>
        <FiChevronDown />
      </Selected>
      <Options isVisible={isVisible}>
        <Option onClick={onClickClear} selected={!!!selectedSite}>
          {selectedSite ? selectedSite.name : "농가선택"}
        </Option>
        {sites.map((site) => (
          <Option
            key={site.id}
            onClick={() => onClickSite(site)}
            selected={selectedSite ? selectedSite.id === site.id : false}
          >
            {site.name}
          </Option>
        ))}
      </Options>
    </Container>
  );
};

export default SiteSelect;

const Container = styled.div`
  position: relative;
`;

const Selected = styled.button`
  height: 40px;
  ${({ theme }) => theme.flex.row}
  align-items: center;
  background: none;
  border: none;
  font-size: 20px;

  p {
    margin-right: 5px;
  }

  @media ${({ theme }) => theme.media.mobile} {
    width: 40px;
    height: 40px;
    ${({ theme }) => theme.flex.row}
    align-items: center;
    justify-content: center;
    background-color: #fff;
    border: 1px solid ${({ theme }) => theme.colors.gray2};
    border-radius: 6px;
    box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.08);

    p {
      display: none;
    }
  }
`;

export const Options = styled.div<{ isVisible: boolean }>`
  width: 255px;
  max-height: 300px;
  display: ${({ isVisible }) => (isVisible ? "block" : "none")};
  padding: 5px 0;
  position: absolute;
  top: 45px;
  right: 0;
  overflow-y: auto;
  border: 1px solid ${({ theme }) => theme.colors.gray2};
  border-radius: 6px;
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
  z-index: 99;
`;

export const Option = styled.button<{ selected: boolean }>`
  width: 100%;
  line-height: 40px;
  padding: 0 20px;
  background: ${({ theme, selected }) =>
    selected ? theme.colors.primaryLight : "#fff"};
  border: none;
  font-size: 16px;
  font-weight: ${({ selected }) => selected && 500};
  text-align: left;
  color: ${({ theme, selected }) =>
    selected ? theme.colors.gray4 : theme.colors.gray3};

  &:hover {
    background-color: ${({ selected, theme }) =>
      selected ? theme.colors.primaryLight : theme.colors.gray1};
  }
`;
