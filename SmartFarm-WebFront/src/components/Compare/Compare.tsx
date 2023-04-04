import styled from "styled-components";
import { Container } from "@components/Period/Period";
import ContentSelectContainer, {
  ContentTypes,
} from "@components/Common/Select/containers/ContentSelectContainer";
import CDatePicker from "@components/Common/CDatePicker/CDatePicker";
import LineChart from "@components/Common/CChart/LineChart";

type Props = {
  selectedContent: ContentTypes;
  onChangeContent: (content: ContentTypes) => void;
  selectedDate: {
    first: {
      start: Date;
      end: Date;
    };
    second: {
      start: Date | null;
      end: Date | null;
    };
  };
  onChangeDate: (
    name: "start" | "end",
    date: Date,
    seq?: "first" | "second"
  ) => void;
  temp: {
    categories: string[];
    data: {
      first: number[];
      second: number[];
    };
  };
};

const Compare = ({
  selectedContent,
  onChangeContent,
  selectedDate,
  onChangeDate,
  temp,
}: Props) => {
  return (
    <Container>
      <header>
        <p>{selectedContent.name}</p>
        <ContentSelectContainer
          selectedContent={selectedContent}
          func={onChangeContent}
        />
      </header>
      <DatePickerContainer>
        <article>
          <p>기준일</p>
          <CDatePicker
            selectedDate={selectedDate.first}
            func={onChangeDate}
            seq="first"
          />
        </article>
        <article>
          <p>비교일</p>
          <CDatePicker
            selectedDate={selectedDate.second}
            func={onChangeDate}
            seq="second"
          />
        </article>
      </DatePickerContainer>
      <LineChart
        categories={temp.categories}
        data={[
          { name: "기준일", data: temp.data.first },
          { name: "비교일", data: temp.data.second },
        ]}
      />
    </Container>
  );
};

export default Compare;

const DatePickerContainer = styled.section`
  margin-bottom: 40px;

  & > article {
    ${({ theme }) => theme.flex.row}
    align-items: center;

    & > p {
      margin-right: 16px;
      font-size: 20px;
      color: ${({ theme }) => theme.colors.gray4};
    }

    &:first-child {
      margin-bottom: 12px;
    }
  }
`;
