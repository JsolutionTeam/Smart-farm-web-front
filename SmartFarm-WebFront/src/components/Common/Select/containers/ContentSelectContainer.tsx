import React, { useState, useRef } from "react";
import ContentSelect from "../ContentSelect";

export type ContentTypes = {
  name: string;
  value:
    | "co2"
    | "co2RegTime"
    | "earthTemperature"
    | "rainfall"
    | "relativeHumidity"
    | "solarRadiation"
    | "temperature"
    | "windDirection"
    | "windSpeed";
};

type Props = {
  selectedContent: ContentTypes;
  func: (content: ContentTypes) => void;
};

const ContentSelectContainer = ({ selectedContent, func }: Props) => {
  const [isVisible, setIsVisible] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  const handleVisible = (visible: boolean) => {
    setIsVisible(visible);
  };

  const onClickContent = (content: ContentTypes) => {
    func(content);
    setIsVisible(false);
  };

  return (
    <ContentSelect
      isVisible={isVisible}
      handleVisible={handleVisible}
      selectedContent={selectedContent}
      onClickContent={onClickContent}
      selectRef={selectRef}
    />
  );
};

export default ContentSelectContainer;
