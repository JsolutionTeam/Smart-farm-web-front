import styled from 'styled-components';

const Period = () => {
  return (
    <Main>
      <Contents>
        <select name='temp' id='temp'>
          <option value='volvo'>그래프항목명</option>
        </select>
        <ChartBox>
          <header>날짜선택</header>
        </ChartBox>
      </Contents>
    </Main>
  );
};

export default Period;

const Main = styled.main`
  flex: 1;
  ${({ theme }) => theme.flex.col}
  align-items: center;
  justify-content: center;
`;

const Contents = styled.section`
  width: 650px;
  ${({ theme }) => theme.flex.col}
  transform: translate(0, -90px);

  select {
    width: 196px;
    align-self: flex-end;
    margin-bottom: 24px;
  }
`;

const ChartBox = styled.section`
  border-radius: 8px;
  overflow: hidden;
  header {
    width: 100%;
    height: 98px;
    background-color: rgba(118, 118, 118, 0.05);
  }
`;
