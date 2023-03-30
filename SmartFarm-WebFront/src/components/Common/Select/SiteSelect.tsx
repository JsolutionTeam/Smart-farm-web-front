import React from "react";
import styled from "styled-components";
import useOutsideClick from "@hooks/useOutsideClick";
import { SiteTypes } from "@store/site/actions";
import { FiChevronDown } from "react-icons/fi";

type Props = {
  sites: SiteTypes[];
  isVisible: boolean;
  visibleHandler: (visible: boolean) => void;
  selectedSite: SiteTypes | null;
  onClickSite: (site: SiteTypes) => void;
  onClickClear: () => void;
  selectRef: React.RefObject<HTMLDivElement>;
};

const SiteSelect = ({
  sites,
  isVisible,
  visibleHandler,
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
      <OptionContainer isVisible={isVisible}>
        <Options>
          <Option onClick={onClickClear} selected={!!!selectedSite}>
            농가선택
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
      </OptionContainer>
    </Container>
  );
};

export default SiteSelect;

const Container = styled.div`
  position: relative;
`;

const Selected = styled.button`
  ${({ theme }) => theme.flex.row}
  align-items: center;
  background: none;
  border: none;
  font-size: 20px;

  p {
    margin-right: 5px;
  }
`;

const OptionContainer = styled.div<{ isVisible: boolean }>`
  width: 200px;
  display: ${({ isVisible }) => (isVisible ? "block" : "none")};
  position: absolute;
  top: 40px;
  right: 0;
  padding: 20px;
  background-color: #fff;
  border: 1px solid ${({ theme }) => theme.colors.gray2};
  border-radius: 6px;
`;

const Options = styled.div`
  width: 100%;
  height: 300px;
  overflow-y: auto;
  ${({ theme }) => theme.flex.col}

  &::-webkit-scrollbar {
    width: 7px;
  }

  &::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.gray2};
    border-radius: 25px;
  }
  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.gray3};
    border-radius: 25px;
  }
  &::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => theme.colors.gray3};
  }
`;

const Option = styled.button<{ selected: boolean }>`
  line-height: 40px;
  background: none;
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray2};
  font-size: 16px;
  font-weight: ${({ selected }) => selected && 600};
  text-align: left;
  color: ${({ theme, selected }) => selected && theme.colors.primary};
`;
