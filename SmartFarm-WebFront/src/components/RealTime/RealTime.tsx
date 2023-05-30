import styled from "styled-components";

type Props = {
  contents: {
    name: string;
    value: number;
    unit: string;
    icon: string;
  }[];
  times: { [key in "co2" | "micro"]: string };
  switchgear: {
    signal: -1 | 0 | 1;
    rate: number;
    time: string;
  };
};

const RealTime = ({ contents, times, switchgear }: Props) => {
  return (
    <Container>
      <ContentContainer>
        <header>실시간 관리</header>
        <Contents>
          {contents.map((content) => (
            <Content key={content.name}>
              <img
                src={`/assets/icons/${content.icon}.svg`}
                alt={`${content.name} 아이콘`}
              />
              <p className="value">{Math.round(content.value)}</p>
              <p className="unit">{content.unit}</p>
              <p className="name">{content.name}</p>
            </Content>
          ))}
        </Contents>
      </ContentContainer>
      <SubContentContainer>
        <SubContentWrapper>
          <header>실시간 데이터 수집시간</header>
          <SubContent>
            <p className="name">CO2</p>
            <p className="value">{times.co2 || "수집시간 없음"}</p>
          </SubContent>
          <SubContent>
            <p className="name">micro</p>
            <p className="value">{times.micro || "수집시간 없음"}</p>
          </SubContent>
        </SubContentWrapper>
        <SubContentWrapper>
          <header>개폐장치</header>
          <SubContent>
            <p className="name">수집시간</p>
            <p className="value">{switchgear.time || "수집시간 없음"}</p>
          </SubContent>
          <SubContent>
            <p className="name">움직임</p>
            <p className="value">
              {switchgear.rate}
              <span>
                {switchgear.signal === -1
                  ? "역방향"
                  : switchgear.signal === 1
                  ? "정방향"
                  : "정지"}
              </span>
            </p>
          </SubContent>
        </SubContentWrapper>
      </SubContentContainer>
    </Container>
  );
};

export default RealTime;

const Container = styled.main`
  ${({ theme }) => theme.flex.row}
  margin-bottom: 150px;

  section {
    background-color: #fff;
    border: 1px solid ${({ theme }) => theme.colors.gray2};
    border-radius: 12px;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.08);

    header {
      color: ${({ theme }) => theme.colors.gray4};
      font-size: 24px;
      font-weight: 600;
    }
  }

  @media ${({ theme }) => theme.media.mobile} {
    width: 100%;
    flex-direction: column;

    section {
      border-radius: 0;
    }
  }
`;

const ContentContainer = styled.section`
  width: 941px;
  height: 750px;
  padding: 40px;

  header {
    margin-bottom: 90px;
  }

  @media ${({ theme }) => theme.media.mobile} {
    width: 100%;
    height: 100%;
    margin-bottom: 32px;
    padding: 40px 20px 120px;
  }
`;

const Contents = styled.article`
  display: grid;
  grid-template-columns: repeat(4, 197px);
  gap: 24px;

  @media ${({ theme }) => theme.media.mobile} {
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
  }
`;

const Content = styled.div`
  ${({ theme }) => theme.flex.col}
  align-items: center;
  padding: 20px;
  background-color: ${({ theme }) => theme.colors.primaryBackground};
  border: 1px solid ${({ theme }) => theme.colors.gray2};
  border-radius: 8px;

  img {
    margin-bottom: 12px;
  }

  .value {
    line-height: 43px;
    color: ${({ theme }) => theme.colors.black};
    font-size: 36px;
    font-weight: 600;
  }

  .unit {
    margin-bottom: 22px;
    line-height: 24px;
    color: ${({ theme }) => theme.colors.gray4};
    font-size: 20px;
  }

  .name {
    line-height: 21px;
    color: ${({ theme }) => theme.colors.gray3};
    font-size: 18px;
    font-weight: 500;
  }

  @media ${({ theme }) => theme.media.mobile} {
  }
`;

const SubContentContainer = styled.div`
  width: 385px;
  margin-left: 32px;

  section {
    padding: 30px;
  }

  header {
    margin-bottom: 24px;
  }

  @media ${({ theme }) => theme.media.mobile} {
    width: 100%;
    margin-left: 0;
  }
`;

const SubContentWrapper = styled.section`
  width: 100%;
  height: 359px;
  margin-bottom: 32px;
`;

const SubContent = styled.div`
  width: 100%;
  padding: 20px;
  border: 1px solid ${({ theme }) => theme.colors.gray2};
  border-radius: 8px;
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.04);

  .name {
    width: fit-content;
    margin-bottom: 16px;
    padding: 6px 12px;
    background-color: ${({ theme }) => theme.colors.primaryBackground};
    border-radius: 16.5px;
    color: ${({ theme }) => theme.colors.primary};
    font-size: 18px;
    font-weight: 500;
  }

  .value {
    color: ${({ theme }) => theme.colors.gray4};
    font-size: 22px;

    span {
      color: ${({ theme }) => theme.colors.gray3};
    }
  }

  &:first-of-type {
    margin-bottom: 12px;
  }
`;
