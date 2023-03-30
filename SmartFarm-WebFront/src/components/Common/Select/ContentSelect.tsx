import React from "react";
import styled from "styled-components";
import useOutsideClick from "@hooks/useOutsideClick";
import { ContentTypes } from "./containers/ContentSelectContainer";
import { FiChevronDown } from "react-icons/fi";

type Props = {
  isVisible: boolean;
  handleVisible: (visible: boolean) => void;
  selectedContent: ContentTypes;
  onClickContent: (content: ContentTypes) => void;
  selectRef: React.RefObject<HTMLDivElement>;
};

const ContentSelect = ({
  isVisible,
  handleVisible,
  selectedContent,
  onClickContent,
  selectRef,
}: Props) => {
  useOutsideClick({ ref: selectRef, func: () => handleVisible(false) });

  const contents: ContentTypes[] = [
    {
      name: "온도",
      value: "temperature",
    },
    {
      name: "습도",
      value: "relativeHumidity",
    },
    {
      name: "일사량",
      value: "solarRadiation",
    },
    {
      name: "CO2농도",
      value: "co2",
    },
    {
      name: "강우량",
      value: "rainfall",
    },
    {
      name: "지온",
      value: "earthTemperature",
    },
    {
      name: "풍향",
      value: "windDirection",
    },
    {
      name: "풍속",
      value: "windSpeed",
    },
  ];

  return (
    <Container ref={selectRef}>
      <Selected onClick={() => handleVisible(!isVisible)}>
        <p>{selectedContent.name}</p>
        <FiChevronDown />
      </Selected>
      <Options isVisible={isVisible}>
        {contents.map((content) => (
          <Option key={content.value} onClick={() => onClickContent(content)}>
            {content.name}
          </Option>
        ))}
      </Options>
    </Container>
  );
};

export default ContentSelect;

const radius = "6px";

const Container = styled.div`
  width: 136px;
  position: relative;
`;

const Selected = styled.button`
  width: 100%;
  height: 40px;
  ${({ theme }) => theme.flex.row}
  align-items: center;
  justify-content: space-between;
  padding: 0 8px 0 20px;
  background-color: ${({ theme }) => theme.colors.primaryBackground};
  border: 1px solid ${({ theme }) => theme.colors.gray2};
  border-radius: ${radius};

  p {
    font-size: 16px;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.gray4};
  }
`;

const Options = styled.div<{ isVisible: boolean }>`
  ${({ theme }) => theme.flex.col}
  display: ${({ isVisible }) => (isVisible ? "block" : "none")};
  position: absolute;
  top: 55px;
`;

const Option = styled.button`
  width: 100%;

  height: 40px;
  padding-left: 20px;
  background-color: ${({ theme }) => theme.colors.primaryBackground};
  border: 1px solid ${({ theme }) => theme.colors.gray2};
  font-size: 16px;
  text-align: left;

  &:first-child {
    border-radius: ${radius} ${radius} 0 0;
  }

  &:last-child {
    border-radius: 0 0 ${radius} ${radius};
  }
`;
