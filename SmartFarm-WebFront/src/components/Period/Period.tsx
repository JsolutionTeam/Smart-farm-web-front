import styled from "styled-components";
import CDatePicker from "@components/Common/CDatePicker/CDatePicker";
import LineChart from "@components/Common/CChart/LineChart";
import { ChartDataTypes } from "@typedef/components/Common/chart.data.types";
import { ContentTypes } from "@typedef/assets/content.types";
import ContentSelectContainer from "@components/Common/Select/containers/ContentSelectContainer";

type Props = {
  selectedContent: ContentTypes;
  onChangeContent: (content: ContentTypes) => void;
  selectedDate: {
    start: Date;
    end: Date;
  };
  onChangeDate: (name: "start" | "end", date: Date) => void;
  chartData: ChartDataTypes;
};

const Period = ({
  selectedContent,
  onChangeContent,
  selectedDate,
  onChangeDate,
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
      {/* <ContentSelectContainer
        selected={selectedContent}
        func={onChangeContent}
      />
      <S.Contents>
        <header>
          <CDatePicker selectedDate={selectedDate} func={onChangeDate} />
        </header>
        <h3>{selectedContent.name}</h3>
        <S.ChartBox>
          <LineChart data={chartData} />
        </S.ChartBox>
      </S.Contents> */}
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

    & > p {
      font-size: 24px;
      font-weight: 600;
      color: ${({ theme }) => theme.colors.gray4};
    }
  }
`;
