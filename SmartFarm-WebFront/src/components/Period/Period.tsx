import styled from 'styled-components';
import CSelectContainer from '@components/Common/CSelect/containers/CSelectContainer';
import CDatePicker from '@components/Common/CDatePicker/CDatePicker';
import LineChart from '@components/Common/CChart/LineChart';
import { ChartDataTypes } from '@typedef/components/Common/chart.data.types';
import { ContentTypes } from '@typedef/assets/content.types';

type Props = {
  selectedContent: ContentTypes;
  onChangeContent: (content: ContentTypes) => void;
  dateRange: {
    start: Date;
    end: Date;
  };
  onChangeDate: (name: 'start' | 'end', date: Date) => void;
  applyDate: () => void;
  chartData: ChartDataTypes;
};

const Period = ({
  selectedContent,
  onChangeContent,
  dateRange,
  onChangeDate,
  applyDate,
  chartData,
}: Props) => {
  return (
    <Main>
      <Contents>
        <CSelectContainer selected={selectedContent} func={onChangeContent} />
        <ChartBox>
          <header>
            <CDatePicker dateRange={dateRange} func={onChangeDate} />
          </header>
          <Chart>
            <h3>{selectedContent.name}</h3>
            <LineChart data={chartData} />
          </Chart>
        </ChartBox>
      </Contents>
    </Main>
  );
};

export default Period;

const Main = styled.main`
  ${({ theme }) => theme.flex.col}
  align-items: center;
`;

const Contents = styled.section`
  width: 650px;
  ${({ theme }) => theme.flex.col}
  margin-top: 40px;

  select {
    width: 196px;
    height: 56px;
    align-self: flex-end;
    margin-bottom: 24px;
    padding: 0 16px;
    background-color: #e4eeee;
    border: 1px solid #45b298;
    border-radius: 8px;
  }

  @media ${({ theme }) => theme.media.mobile} {
    width: calc(100vw - 100px);
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(4, 45vw);
  }
`;

const ChartBox = styled.section`
  background-color: #fff;
  border: 1px solid #d8d8d8;
  border-radius: 8px;
  overflow: hidden;
  header {
    width: 100%;
    ${({ theme }) => theme.flex.row}
    align-items: center;
    justify-items: center;
    padding: 18px 30px;
    background-color: rgba(118, 118, 118, 0.05);
  }
`;

const Chart = styled.section`
  padding: 18px 30px;
  h3 {
    ${({ theme }) => theme.flex.col}
    justify-content: center;
    font-size: 20px;
  }
`;
