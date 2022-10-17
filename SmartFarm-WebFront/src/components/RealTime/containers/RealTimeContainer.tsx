import RealTime from '../RealTime';
import { useState, useEffect, useMemo, useCallback } from 'react';
import { apiRoute, requestSecureGet } from '@lib/api';
import useToken from '@hooks/useToken';
import useUser from '@hooks/useUser';
import { RealTimeTypes } from '@typedef/components/RealTime/real.time.types';
import { realTimeListTypes } from '@typedef/components/RealTime/real.time.list.types';
import { UnitTypes } from '@typedef/components/RealTime/unit.types';
import img from '@assets/image';

const RealTimeContainer = () => {
  const { getToken } = useToken();
  const { getUser } = useUser();
  const siteSeq = useMemo(() => getUser().siteSeq, [getUser]);
  const [realTimeData, setRealTimeData] = useState<RealTimeTypes>({
    co2: 0,
    co2RegTime: 0,
    earthTemperature: 0,
    microRegTime: 0,
    rainfall: 0,
    relativeHumidity: 0,
    solarRadiation: 0,
    temperature: 0,
    windDirection: 0,
    windSpeed: 0,
  });
  const contents: realTimeListTypes[] = useMemo(
    () => [
      {
        name: '온도',
        value: realTimeData.temperature,
        unit: '°C',
        icon: img.IcTemperature,
      },
      {
        name: '습도',
        value: realTimeData.relativeHumidity,
        unit: '%',
        icon: img.IcHumidity,
      },
      {
        name: '일사량',
        value: realTimeData.solarRadiation,
        unit: 'W/㎡',
        icon: img.IcSun,
      },
      {
        name: 'CO2농도',
        value: realTimeData.co2,
        unit: 'ppm',
        icon: img.IcCO2,
      },
      {
        name: '강우량',
        value: realTimeData.rainfall,
        unit: 'mm',
        icon: img.IcRain,
      },
      {
        name: '지온',
        value: realTimeData.earthTemperature,
        unit: '°C',
        icon: img.IcGeothermal,
      },
      {
        name: '풍향',
        value: realTimeData.windDirection,
        unit: '°',
        icon: img.IcWindDirection,
      },
      {
        name: '풍속',
        value: realTimeData.windSpeed,
        unit: 'm/s',
        icon: img.IcWindSpeed,
      },
    ],
    [realTimeData],
  );

  const setClassName = (unit: UnitTypes) => {
    let clasName: '' | 'big' = '';

    if (unit === '°C' || unit === '%' || unit === '°') {
      clasName = 'big';
    }

    return clasName;
  };

  const getRealTimeData = useCallback(async () => {
    const { config, data } = await requestSecureGet<RealTimeTypes[]>(
      apiRoute.site + `${siteSeq}/realtime`,
      {},
      getToken()!,
    );
    if (config.status >= 200 && config.status < 400) {
      setRealTimeData(data[0]);
    }
  }, [siteSeq, getToken]);

  useEffect(() => {
    const interval = setInterval(() => {
      getRealTimeData();
    }, 50000000);
    return () => {
      clearInterval(interval);
    };
  }, [getRealTimeData]);

  useEffect(() => {
    getRealTimeData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <RealTime contents={contents} setClassName={setClassName} />;
};

export default RealTimeContainer;
