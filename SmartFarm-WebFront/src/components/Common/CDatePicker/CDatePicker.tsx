import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import { FiCalendar } from 'react-icons/fi';

type Props = {
  dateRange: {
    start: Date;
    end: Date;
  };
  func: (name: 'start' | 'end', date: Date) => void;
};
const CDatePicker = ({ dateRange, func }: Props) => {
  return (
    <CDatePickerBox>
      <DatePicker
        selectsStart
        selected={dateRange.start}
        onChange={(date) => {
          if (date) {
            func('start', date);
          }
        }}
        maxDate={dateRange.end}
        dateFormatCalendar='yyyy년 MM월'
        dateFormat='yyyy-MM-dd'
      />
      <p>~</p>
      <DatePicker
        selectsEnd
        selected={dateRange.end}
        onChange={(date) => {
          if (date) {
            func('end', date);
          }
        }}
        minDate={dateRange.start}
        maxDate={new Date()}
        dateFormatCalendar='yyyy년 MM월'
        dateFormat='yyyy-MM-dd'
      />
      <FiCalendar />
    </CDatePickerBox>
  );
};

export default CDatePicker;

const CDatePickerBox = styled.section`
  width: fit-content;
  height: 50px;
  ${({ theme }) => theme.flex.row}
  align-items: center;
  background-color: #fff;
  border: 1px solid #d8d8d8;
  border-radius: 8px;

  .react-datepicker-wrapper {
    width: 100px;

    input {
      width: 100%;
      line-height: 50px;
      background: none;
      text-align: center;
    }
  }
`;
