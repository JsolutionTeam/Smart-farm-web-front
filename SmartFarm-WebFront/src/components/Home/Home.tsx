import styled from 'styled-components';
import img from '@assets/image';

type Props = {};

const Home = (props: Props) => {
  return (
    <Main>
      <Contents>
        {temp.map((temp) => (
          <Content key={temp.name}>
            <section>
              <p className='name'>{temp.name}</p>
              <p className='value'>
                {temp.value}
                <span
                  className={
                    temp.unit === '°C' || temp.unit === '%' || temp.unit === '°'
                      ? 'big'
                      : ''
                  }>
                  {temp.unit}
                </span>
              </p>
            </section>
            <img src={temp.icon} alt={`${temp.name} 아이콘`} />
          </Content>
        ))}
      </Contents>
    </Main>
  );
};

export default Home;

const Main = styled.main`
  flex: 1;
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
      font-size: 40px;
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

const temp = [
  {
    name: '온도',
    value: 12,
    unit: '°C',
    icon: img.IconTemperature,
  },
  {
    name: '습도',
    value: 12,
    unit: '%',
    icon: img.IconHumidity,
  },
  {
    name: '일사량',
    value: 12,
    unit: 'W/㎡',
    icon: img.IconSun,
  },
  {
    name: 'CO2농도',
    value: 12,
    unit: 'ppm',
    icon: img.IconCO2,
  },
  {
    name: '강우량',
    value: 12,
    unit: 'mm',
    icon: img.IconRain,
  },
  {
    name: '지온',
    value: 12,
    unit: '°C',
    icon: img.IconGeothermal,
  },
  {
    name: '풍향',
    value: 12,
    unit: '°',
    icon: img.IconWindDirection,
  },
  {
    name: '풍속',
    value: 12,
    unit: 'm/s',
    icon: img.IconWindSpeed,
  },
];
