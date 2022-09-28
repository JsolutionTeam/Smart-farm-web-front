import styled from 'styled-components';
import LineChart from '@components/Common/CChart/LineChart';
import { ChartDataTypes } from '@typedef/components/Common/chart.data.types';

const Compare = () => {
  return (
    <Main>
      <Contents>
        <select name='temp' id='temp'>
          <option value='1'>그래프항목명</option>
          <option value='2'>그래프항목명</option>
          <option value='3'>그래프항목명</option>
          <option value='4'>그래프항목명</option>
        </select>
        <ChartBox>
          <header>날짜선택</header>
          <Chart>
            <h3>그래프제목</h3>
            <LineChart data={data} />
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
    height: 56px;
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

const labels = ['1일', '5일', '10일', '15일', '20일', '25일'];

const data: ChartDataTypes = {
  labels: labels,
  datasets: [
    {
      label: 'Dataset 1',
      data: labels.map((_, idx) => 100 + idx),
      borderColor: '#058b6b',
      backgroundColor: '#058b6b',
    },
    {
      label: 'Dataset 1',
      data: labels.map((_, idx) => 120 + idx),
      borderColor: '#ffa20d',
      backgroundColor: '#ffa20d',
    },
  ],
};
