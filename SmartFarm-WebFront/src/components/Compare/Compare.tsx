import styled from 'styled-components';
import LineChart from '@components/Common/CChart/LineChart';
import { ChartDataTypes } from '@typedef/components/Common/chart.data.types';
import { ContentTypes } from '@typedef/assets/content.types';
import CSelectContainer from '@components/Common/CSelect/containers/CSelectContainer';
import CDatePicker from '@components/Common/CDatePicker/CDatePicker';

type Props = {
  selectedContent: ContentTypes;
  onChangeContent: (content: ContentTypes) => void;
  selectedDate: {
    first: {
      start: Date;
      end: Date;
    };
    second: {
      start: Date;
      end: Date;
    };
  };
  onChangeDate: (name: 'start' | 'end', date: Date, seq?: 1 | 2) => void;
  chartData: ChartDataTypes;
};

const Compare = ({
  selectedContent,
  onChangeContent,
  selectedDate,
  onChangeDate,
  chartData,
}: Props) => {
  return (
    <Main>
      <Contents>
        <CSelectContainer selected={selectedContent} func={onChangeContent} />
        <ChartBox>
          <header>
            <CDatePicker
              seq={1}
              selectedDate={selectedDate.first}
              func={onChangeDate}
            />
            <div className='hyphen'>-</div>
            <CDatePicker
              seq={2}
              selectedDate={selectedDate.second}
              func={onChangeDate}
            />
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

export default Compare;

const Main = styled.main`
  ${({ theme }) => theme.flex.col}
  align-items: center;
`;

const Contents = styled.section`
  width: 650px;
  ${({ theme }) => theme.flex.col}
  margin-top: 40px;

  .cselect {
    align-self: flex-end;
    margin-bottom: 20px;
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
    padding: 18px 30px;
    background-color: rgba(118, 118, 118, 0.05);

    .hyphen {
      padding: 0 10px;
    }
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
