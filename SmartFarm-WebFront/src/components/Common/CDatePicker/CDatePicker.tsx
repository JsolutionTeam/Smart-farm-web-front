import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import Img from '@assets/image';
type Props = {
  seq?: 1 | 2;
  selectedDate: {
    start: Date;
    end: Date;
  };
  func: (name: 'start' | 'end', date: Date, seq?: 1 | 2) => void;
};
const CDatePicker = ({ seq, selectedDate, func }: Props) => {
  return (
    <CDatePickerBox>
      <DatePicker
        selectsStart
        selected={selectedDate.start}
        onChange={(date) => {
          if (date) {
            func('start', date, seq);
          }
        }}
        maxDate={selectedDate.end}
        dateFormatCalendar='yyyy년 MM월'
        dateFormat='yyyy.MM.dd'
      />
      <p>~</p>
      <DatePicker
        selectsEnd
        selected={selectedDate.end}
        onChange={(date) => {
          if (date) {
            func('end', date, seq);
          }
        }}
        minDate={selectedDate.start}
        maxDate={new Date()}
        dateFormatCalendar='yyyy년 MM월'
        dateFormat='yyyy.MM.dd'
      />
      <img src={Img.IcDate} alt='달력 아이콘' className='icDate' />
    </CDatePickerBox>
  );
};

export default CDatePicker;

const CDatePickerBox = styled.section`
  width: fit-content;
  height: 45px;
  ${({ theme }) => theme.flex.row}
  align-items: center;
  background-color: #fff;
  border: 1px solid #d8d8d8;
  border-radius: 5px;

  .react-datepicker-wrapper {
    width: 100px;

    input {
      width: 100%;
      background: none;
      color: #767676;
      font-size: 16px;
      text-align: center;
    }
  }

  .icDate {
    width: 16px;
    margin-right: 10px;
  }
`;
