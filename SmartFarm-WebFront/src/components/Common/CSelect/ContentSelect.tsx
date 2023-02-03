import { contents } from "@assets/content";
import { ContentTypes } from "@typedef/assets/content.types";
import { FiChevronDown } from "react-icons/fi";
import styled from "styled-components";

type Props = {
  selected: ContentTypes;
  onChangeSelect: (content: ContentTypes) => void;
  visibleOption: boolean;
  onClickSelected: () => void;
  selectRef: React.RefObject<HTMLElement>;
};

const ContentSelect = ({
  selected,
  onChangeSelect,
  visibleOption,
  onClickSelected,
  selectRef,
}: Props) => {
  return (
    <CSelectBox ref={selectRef} className="cselect">
      <Selected onClick={onClickSelected}>
        <p>{selected.name}</p>
        <FiChevronDown className={visibleOption ? "arrow open" : "arrow"} />
      </Selected>
      <Options visible={visibleOption}>
        {contents.map((content) => (
          <Option
            key={content.value}
            onClick={() => onChangeSelect(content)}
            selected={content.name === selected.name}
          >
            {content.name}
          </Option>
        ))}
      </Options>
    </CSelectBox>
  );
};

export default ContentSelect;

const CSelectBox = styled.section`
  width: 190px;
  position: relative;
`;

const Selected = styled.button`
  width: 100%;
  height: 45px;
  ${({ theme }) => theme.flex.row}
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  background-color: #e4eeee;
  color: #000;
  border: 1px solid #45b298;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  .arrow {
  }
  .open {
    transform: rotate(180deg);
  }
`;

const Options = styled.div<{ visible: boolean }>`
  width: 100%;
  display: ${({ visible }) => (visible ? "block" : "none")};
  position: absolute;
  top: 55px;
  background-color: #e4eeee;
  border: 1px solid #45b298;
  border-radius: 5px;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  z-index: 10;
`;

const Option = styled.div<{ selected: boolean }>`
  line-height: 45px;
  padding: 0 20px;
  color: ${({ selected }) => !selected && "#767676"};
  border-bottom: 1px solid #45b298;
  cursor: pointer;
  &:last-child {
    border-bottom: none;
  }
  &:hover {
    background-color: rgb(69, 178, 152, 0.2);
  }
`;
