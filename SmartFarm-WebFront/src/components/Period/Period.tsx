import styled from "styled-components";
import CDatePicker from "@components/Common/CDatePicker/CDatePicker";
import ContentSelectContainer, {
  ContentTypes,
} from "@components/Common/Select/containers/ContentSelectContainer";
import LineChart from "@components/Common/CChart/LineChart";
import dayjs from "dayjs";

type Props = {
  selectedContent: ContentTypes;
  onChangeContent: (content: ContentTypes) => void;
  selectedDate: {
    start: Date;
    end: Date;
  };
  onChangeDate: (name: "start" | "end", date: Date) => void;
  chartXAxis: string[];
  chartData: number[];
};

const Period = ({
  selectedContent,
  onChangeContent,
  selectedDate,
  onChangeDate,
  chartXAxis,
  chartData,
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
        <CDatePicker selectedDate={selectedDate} func={onChangeDate} />
      </DatePickerContainer>
      <ChartContainer>
        <LineChart
          categories={chartXAxis.map((x) => `${dayjs(x).format("MM/DD HH")}시`)}
          data={[{ name: selectedContent.name, data: chartData }]}
        />
      </ChartContainer>
    </Container>
  );
};

export default Period;

export const Container = styled.main`
  width: 802px;
  ${({ theme }) => theme.flex.col}
  margin-bottom: 120px;
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

  @media ${({ theme }) => theme.media.mobile} {
    width: 100%;
    overflow-x: scroll;
  }
`;

const DatePickerContainer = styled.section`
  margin-bottom: 40px;
`;

export const ChartContainer = styled.section`
  width: 100%;
  height: 420px;
  ${({ theme }) => theme.flex.row}

  p {
    width: fit-content;
    align-self: center;
    color: ${({ theme }) => theme.colors.gray3};
    /* transform: rotate(270deg); */
  }

  & > div {
    width: 100%;
    height: 100%;
  }

  @media ${({ theme }) => theme.media.mobile} {
    width: 1000px;
    height: 1090%;
  }
`;
