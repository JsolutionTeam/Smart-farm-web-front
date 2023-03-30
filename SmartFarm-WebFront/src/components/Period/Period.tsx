import styled from "styled-components";
import CDatePicker from "@components/Common/CDatePicker/CDatePicker";
// import LineChart from "@components/Common/CChart/LineChart";
import { ChartDataTypes } from "@typedef/components/Common/chart.data.types";
import { ContentTypes } from "@typedef/assets/content.types";
import ContentSelectContainer from "@components/Common/Select/containers/ContentSelectContainer";
import LineChart from "@components/Common/CChart/LineChart";

type Props = {
  selectedContent: ContentTypes;
  contentHandler: (content: ContentTypes) => void;
  selectedDate: {
    start: Date;
    end: Date;
  };
  onChangeDate: (name: "start" | "end", date: Date) => void;
  chartData: ChartDataTypes;
  temp: {
    categories: string[];
    data: number[];
  };
};

const Period = ({
  selectedContent,
  contentHandler,
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
          func={contentHandler}
        />
      </header>
      <DatePickerContainer>
        <CDatePicker selectedDate={selectedDate} func={onChangeDate} />
      </DatePickerContainer>
      <LineChart
        categories={temp.categories}
        data={[{ name: selectedContent.name, data: temp.data }]}
      />
    </Container>
  );
};

export default Period;

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
