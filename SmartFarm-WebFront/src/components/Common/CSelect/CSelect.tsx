import styled from 'styled-components';
import { contents } from '@assets/content';
import { ContentTypes } from '@typedef/assets/content.types';
import { FiChevronDown } from 'react-icons/fi';

type Props = {
  selected: ContentTypes;
  onChangeSelect: (content: ContentTypes) => void;
  visibleOption: boolean;
  onClickSelected: () => void;
  selectRef: React.RefObject<HTMLElement>;
};

const CSelect = ({
  selected,
  onChangeSelect,
  visibleOption,
  onClickSelected,
  selectRef,
}: Props) => {
  return (
    <CSelectBox ref={selectRef}>
      <Selected onClick={onClickSelected}>
        <p>{selected.name}</p>
        <FiChevronDown className={visibleOption ? 'arrow open' : 'arrow'} />
      </Selected>
      <Options visible={visibleOption}>
        {contents.map((content) => (
          <Option key={content.value} onClick={() => onChangeSelect(content)}>
            {content.name}
          </Option>
        ))}
      </Options>
    </CSelectBox>
  );
};

export default CSelect;

const CSelectBox = styled.section`
  width: 200px;
  position: relative;
`;

const Selected = styled.button`
  width: 100%;
  height: 50px;
  ${({ theme }) => theme.flex.row}
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  background-color: #e4eeee;
  border: 1px solid #45b298;
  border-radius: 8px;
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
  position: absolute;
  top: 50px;
  display: ${({ visible }) => (visible ? 'block' : 'none')};
  background-color: #e4eeee;
  border: 1px solid #45b298;
  border-radius: 8px;
  z-index: 10;
`;

const Option = styled.div`
  padding: 0 20px;
  cursor: pointer;
`;
