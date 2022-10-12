import styled from 'styled-components';

export const Main = styled.main`
  width: 650px;
  ${({ theme }) => theme.flex.col}
  margin: 40px auto;
  margin-bottom: 0;

  .cselect {
    align-self: flex-end;
    margin-bottom: 20px;
  }

  @media ${({ theme }) => theme.media.mobile} {
    width: calc(100vw - 40px);
  }
`;

export const Contents = styled.section`
  background-color: #fff;
  border: 1px solid #d8d8d8;
  border-radius: 8px;
  overflow: hidden;
  header {
    width: 100%;
    ${({ theme }) => theme.flex.row}
    align-items: center;
    justify-items: center;
    padding: 20px;
    background-color: rgba(118, 118, 118, 0.05);
  }

  h3 {
    ${({ theme }) => theme.flex.col}
    justify-content: center;
    margin: 20px;
    margin-bottom: 0;
    font-size: 20px;
  }
`;

export const ChartBox = styled.section`
  height: 250px;
  margin: 20px;

  @media ${({ theme }) => theme.media.mobile} {
    height: 400px;
    canvas {
      width: 100%;
    }
  }
`;
