import styled from "styled-components";
import DatePicker from "react-datepicker";

type Props = {
  selectedDate: {
    start: Date | null;
    end: Date | null;
  };
  func: (name: "start" | "end", date: Date, seq?: "first" | "second") => void;
  seq?: "first" | "second";
};

const CDatePicker = ({ seq, selectedDate, func }: Props) => {
  return (
    <Container>
      <Dates>
        <DatePicker
          selectsStart
          selected={selectedDate.start}
          onChange={(date) => {
            if (date) {
              func("start", date, seq);
            }
          }}
          maxDate={selectedDate.end}
          dateFormatCalendar="yyyy년 MM월"
          dateFormat="yyyy.MM.dd"
          onFocus={(e) => e.target.blur()}
        />
        <p>~</p>
        <DatePicker
          selectsEnd
          selected={selectedDate.end}
          onChange={(date) => {
            if (date) {
              func("end", date, seq);
            }
          }}
          minDate={selectedDate.start}
          maxDate={new Date()}
          dateFormatCalendar="yyyy년 MM월"
          dateFormat="yyyy.MM.dd"
          onFocus={(e) => e.target.blur()}
        />
      </Dates>
    </Container>
  );
};

export default CDatePicker;

const Container = styled.section`
  width: fit-content;
  height: 62px;
  ${({ theme }) => theme.flex.row}
  align-items: center;
  border: 1px solid ${({ theme }) => theme.colors.gray2};
  border-radius: 6px;

  &:before {
    content: "";
    width: 62px;
    height: 62px;
    background: url(/assets/icons/calendar.svg) no-repeat;
    background-color: ${({ theme }) => theme.colors.primaryBackground};
    background-position: center;
  }
`;

const Dates = styled.article`
  ${({ theme }) => theme.flex.row}
  align-items: center;
  padding: 0 20px;

  .react-datepicker-wrapper {
    width: inherit;

    input {
      width: 120px;
      border: none;
      font-size: 20px;
      color: ${({ theme }) => theme.colors.gray3};
      text-align: center;
    }
  }

  p {
    color: ${({ theme }) => theme.colors.gray3};
  }
`;
