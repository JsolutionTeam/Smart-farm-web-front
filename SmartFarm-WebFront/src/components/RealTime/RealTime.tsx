import styled from 'styled-components';
import { realTimeListTypes } from '@typedef/components/RealTime/real.time.list.types';
import { UnitTypes } from '@typedef/components/RealTime/unit.types';

type Props = {
  realTimeDataList: realTimeListTypes[];
  setClassName: (unit: UnitTypes) => '' | 'big';
};

const RealTime = ({ realTimeDataList, setClassName }: Props) => {
  return (
    <Main>
      <Contents>
        {realTimeDataList.map((content) => (
          <Content key={content.name}>
            <section>
              <p className='name'>{content.name}</p>
              <p className='value'>
                {content.value ? Math.round(content.value) : 0}
                <span className={setClassName(content.unit)}>
                  {content.unit}
                </span>
              </p>
            </section>
            <img src={content.icon} alt={`${content.name} 아이콘`} />
          </Content>
        ))}
      </Contents>
    </Main>
  );
};

export default RealTime;

const Main = styled.main`
  ${({ theme }) => theme.flex.col}
  align-items: center;
`;

const Contents = styled.section`
  display: grid;
  grid-template-columns: repeat(4, 13vw);
  grid-template-rows: repeat(2, 13vw);
  gap: 20px;
  margin-top: 40px;

  @media ${({ theme }) => theme.media.mobile} {
    width: calc(100vw - 100px);
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(4, 45vw);
  }
`;

const Content = styled.div`
  ${({ theme }) => theme.flex.col}
  justify-content: space-between;
  padding: 20px;
  background-color: #fff;
  border: 1px solid #d8d8d8;
  border-radius: 8px;

  .name {
    line-height: 26px;
    font-size: 22px;
    color: #767676;
  }

  .value {
    line-height: 72px;
    font-size: 60px;
    font-weight: 900;
    span {
      font-size: 40px;
      font-weight: 500;
    }
    .big {
      font-size: 54px;
    }
  }

  img {
    width: 52px;
    align-self: flex-end;
  }

  @media ${({ theme }) => theme.media.mobile} {
    .name {
      font-size: 20px;
    }
    .value {
      position: absolute;

      span {
        font-size: 30px;
      }
    }
  }
`;
