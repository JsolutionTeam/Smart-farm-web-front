import styled from "styled-components";
import { ListTypes } from "@typedef/components/Common/CSelect/list.types";
import { FiChevronDown } from "react-icons/fi";

type Props = {
  visibleOption: boolean;
  selected: string | null;
  onClickSelected: () => void;
  options: ListTypes[];
  onChangeSelect: (selected: ListTypes) => void;
  resetSelect: () => void;
  selectRef: React.RefObject<HTMLElement>;
};

const ListSelect = ({
  visibleOption,
  selected,
  onClickSelected,
  options,
  onChangeSelect,
  resetSelect,
  selectRef,
}: Props) => {
  return (
    <CSelectBox ref={selectRef}>
      <Selected onClick={onClickSelected}>
        <p>{selected ? selected : "농가선택"}</p>
        <FiChevronDown className={visibleOption ? "arrow open" : "arrow"} />
      </Selected>
      <OptionBox visible={visibleOption}>
        <Options>
          <Option onClick={resetSelect} selected={!!!selected}>
            농장선택
          </Option>
          {options.map((option) => (
            <Option
              key={option.name}
              onClick={() => onChangeSelect(option)}
              selected={option.name === selected}
            >
              {option.name}
            </Option>
          ))}
        </Options>
      </OptionBox>
    </CSelectBox>
  );
};

export default ListSelect;

const CSelectBox = styled.section`
  width: 250px;
  position: absolute;
  right: 40px;
`;

const Selected = styled.button`
  ${({ theme }) => theme.flex.row}
  align-items: center;
  background: none;
  margin-left: auto;
  font-size: 16px;
  cursor: pointer;
  text-align: left;

  .arrow {
    margin-left: 5px;
  }
`;

const OptionBox = styled.div<{ visible: boolean }>`
  display: ${({ visible }) => (visible ? "block" : "none")};
  padding: 7px;
  position: absolute;
  top: 30px;
  right: 0;
  background-color: #fff;
  border: 1px solid #e8e8e8;
  border-radius: 5px;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  z-index: 10;
`;

const Options = styled.div`
  height: 300px;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 7px;
  }

  &::-webkit-scrollbar-track {
    background: #ecf0f1;
    border-radius: 25px;
  }
  &::-webkit-scrollbar-thumb {
    background: #ccc;
    border-radius: 25px;
  }
  &::-webkit-scrollbar-thumb:hover {
    background: #b3b3b3;
  }
`;

const Option = styled.div<{ selected: boolean }>`
  line-height: 45px;
  padding: 0 20px;
  color: ${({ selected }) => !selected && "#767676"};
  border-bottom: 1px solid #e8e8e8;
  cursor: pointer;

  &:last-child {
    border-bottom: none;
  }
  &:hover {
    background-color: rgb(232, 232, 232, 0.5);
  }
`;
