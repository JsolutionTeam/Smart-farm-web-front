import styled from 'styled-components';
import { realTimeListTypes } from '@typedef/components/RealTime/real.time.list.types';
import { UnitTypes } from '@typedef/components/RealTime/unit.types';

type Props = {
  contents: realTimeListTypes[];
  setClassName: (unit: UnitTypes) => '' | 'big';
};

const RealTime = ({ contents, setClassName }: Props) => {
  return (
    <Main>
      {contents.map((content) => (
        <Content key={content.name}>
          <section>
            <p className='name'>{content.name}</p>
            <Value>
              {content.value ? Math.round(content.value) : 0}
              <span className={setClassName(content.unit)}>{content.unit}</span>
            </Value>
          </section>
          <img src={content.icon} alt={`${content.name} 아이콘`} />
        </Content>
      ))}
    </Main>
  );
};

export default RealTime;

const Main = styled.main`
  display: grid;
  grid-template-columns: repeat(4, 13vw);
  grid-template-rows: repeat(2, 13vw);
  gap: 20px;
  margin: 40px auto;
  margin-bottom: 0;

  @media ${({ theme }) => theme.media.mobile} {
    width: calc(100vw - 40px);
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

  img {
    width: 52px;
    align-self: flex-end;
  }

  .name {
    line-height: 22px;
    font-size: 22px;
    color: #767676;
  }
`;

const Value = styled.p`
  line-height: 60px;
  font-size: 60px;
  font-weight: 900;

  span {
    line-height: 40px;
    font-size: 40px;
    font-weight: 500;
  }

  .big {
    line-height: 54px;
    font-size: 54px;
  }

  @media ${({ theme }) => theme.media.mobile} {
    position: absolute;
    line-height: 50px;
    font-size: 50px;

    span {
      line-height: 30px;
      font-size: 30px;
    }
    .big {
      line-height: 45px;
      font-size: 45px;
    }
  }
`;
