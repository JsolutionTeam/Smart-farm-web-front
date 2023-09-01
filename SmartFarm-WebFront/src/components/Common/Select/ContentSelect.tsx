import React from "react";
import styled from "styled-components";
import { Options, Option } from "./SiteSelect";
import useOutsideClick from "@hooks/useOutsideClick";
import { ContentTypes } from "./containers/ContentSelectContainer";

type Props = {
  isVisible: boolean;
  visibleHandler: (visible: boolean) => void;
  selectedContent: ContentTypes;
  onClickContent: (content: ContentTypes) => void;
  selectRef: React.RefObject<HTMLDivElement>;
};

export const contents: ContentTypes[] = [
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
    name: "대지 습도",
    value: "earthHumidity",
  },
  {
    name: "풍향",
    value: "windDirection",
  },
  {
    name: "풍속",
    value: "windSpeed",
  },
  {
    name: "작물 근접 온도",
    value: "cropTemperature",
  },
  {
    name: "작물 근접 습도",
    value: "cropHumidity",
  },

];

const ContentSelect = ({
  isVisible,
  visibleHandler,
  selectedContent,
  onClickContent,
  selectRef,
}: Props) => {
  useOutsideClick({ ref: selectRef, func: () => visibleHandler(false) });

  return (
    <Container ref={selectRef}>
      <Selected onClick={() => visibleHandler(!isVisible)}>
        <p>{selectedContent.name}</p>
      </Selected>
      <Options isVisible={isVisible}>
        {contents.map((content) => (
          <Option
            key={content.value}
            onClick={() => onClickContent(content)}
            selected={selectedContent.value === content.value}
          >
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
  width: 148px;
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

  &:after {
    content: "";
    width: 20px;
    height: 20px;
    display: block;
    background: url(/assets/icons/down2.svg) no-repeat;
    background-position: center;
  }
`;
