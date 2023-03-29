import styled from "styled-components";
import { realTimeListTypes } from "@typedef/components/RealTime/real.time.list.types";
import { UnitTypes } from "@typedef/components/RealTime/unit.types";

type Props = {
  contents: realTimeListTypes[];
  setClassName: (unit: UnitTypes) => "" | "big";
  time: {
    co2: number;
    micro: number;
  };
  switchgear: {
    signal: -1 | 0 | 1;
    rate: number;
    time: string;
  };
};

const RealTime = ({ contents, setClassName, time, switchgear }: Props) => {
  return (
    <Container>
      <Contents>
        {contents.map((content) => (
          <Content key={content.name}>
            <section>
              <p className="name">{content.name}</p>
              <Value>
                {content.value ? Math.round(content.value) : 0}
                <span className={setClassName(content.unit)}>
                  {content.unit}
                </span>
              </Value>
            </section>
            <img src={content.icon} alt={`${content.name} 아이콘`} />
          </Content>
        ))}
      </Contents>
      <SubContents>
        <article>
          <p className="subtitle">실시간 데이터 수집시간</p>
          <p>co2 {time.co2 || "없음"}</p>
          <p>micro {time.micro || "없음"}</p>
        </article>
        <article>
          <p className="subtitle">개폐장치</p>
          <p>수집시간 {switchgear.time}</p>
          <p>
            움직임&nbsp;
            {switchgear.signal === -1
              ? "역방향"
              : switchgear.signal === 1
              ? "정방향"
              : "정지"}
            &nbsp;
            {switchgear.rate}
          </p>
        </article>
      </SubContents>
    </Container>
  );
};

export default RealTime;

const Container = styled.main`
  ${({ theme }) => theme.flex.col}
  align-items: center;
  margin: 40px auto;
  margin-bottom: 0;
`;

const Contents = styled.section`
  display: grid;
  grid-template-columns: repeat(4, 13vw);
  grid-template-rows: repeat(2, 13vw);
  gap: 20px;

  @media ${({ theme }) => theme.media.mobile} {
    width: calc(100vw - 40px);
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(4, 45vw);
  }
`;

const Content = styled.article`
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

const SubContents = styled.section`
  width: 100%;
  ${({ theme }) => theme.flex.row}
  justify-content: space-between;
  margin-top: 30px;

  article {
    width: calc(50% - 10px);
    ${({ theme }) => theme.flex.col}

    p {
      color: #767676;
    }
  }

  .subtitle {
    margin-bottom: 5px;
    font-size: 20px;
    font-weight: 600;
    color: #000;
  }

  @media ${({ theme }) => theme.media.mobile} {
    ${({ theme }) => theme.flex.col}

    article {
      width: 100%;
      &:last-child {
        margin-top: 20px;
      }
    }
  }
`;
