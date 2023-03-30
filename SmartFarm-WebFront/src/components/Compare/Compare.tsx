import styled from "styled-components";
// import LineChart from "@components/Common/CChart/LineChart";
import { ChartDataTypes } from "@typedef/components/Common/chart.data.types";
import ContentSelectContainer from "@components/Common/Select/containers/ContentSelectContainer";
import CDatePicker from "@components/Common/CDatePicker/CDatePicker";
import { ContentTypes } from "@typedef/assets/content.types";
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
  chartData: ChartDataTypes;
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
  chartData,
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

const Container = styled.main`
  width: 802px;
  ${({ theme }) => theme.flex.col}
  padding: 40px;
  background-color: #fff;
  border: 1px solid ${({ theme }) => theme.colors.gray2};
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.08);
  border-radius: 12px;

  header {
    ${({ theme }) => theme.flex.row}
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;

    & > p {
      font-size: 24px;
      font-weight: 600;
      color: ${({ theme }) => theme.colors.gray4};
    }
  }
`;

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

const ChartContainer = styled.section`
  height: 420px;
  ${({ theme }) => theme.flex.row}

  p {
    width: fit-content;
    align-self: center;
    color: ${({ theme }) => theme.colors.gray3};
    /* transform: rotate(270deg); */
  }
`;
