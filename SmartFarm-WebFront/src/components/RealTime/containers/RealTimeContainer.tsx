import RealTime from "../RealTime";
import { useState, useEffect, useMemo, useCallback } from "react";
import { requestSecureGet } from "@lib/api";
import useLocalStorage from "@hooks/useLocalStorage";
import useSite from "@hooks/store/useSite";

// 실시간, 기간, 비교에서 사용하는 타입
export type SummaryTypes = {
  co2: number;
  co2RegTime: string;
  earthTemperature: number;
  earthHumidity: number; // 대지 수분 함수율
  microRegTime: string;
  rainfall: number;
  relativeHumidity: number;
  siteSeq: number;
  solarRadiation: number;
  temperature: number;
  windDirection: number;
  windSpeed: number;
  cropTemperature: number; // 작물 근접 온도
  cropHumidity: number; // 작물 근접 습도
};

type RealTimeTypes = SummaryTypes & {
  rateOfOpening: number;
  openSignal: -1 | 0 | 1;
  openDataRegTime: string;
};

const RealTimeContainer = () => {
  const { getToken, getUser } = useLocalStorage();
  const { selectedSite } = useSite();
  const [data, setData] = useState<RealTimeTypes>({
    co2: 0,
    co2RegTime: "",
    earthTemperature: 0,
    earthHumidity: 0,
    microRegTime: "",
    rainfall: 0,
    relativeHumidity: 0,
    siteSeq: 0,
    solarRadiation: 0,
    temperature: 0,
    windDirection: 0,
    windSpeed: 0,
    cropTemperature: 0,
    cropHumidity: 0,
    rateOfOpening: 0,
    openSignal: 0,
    openDataRegTime: "",
  });
  const contents = useMemo(
    () => [
      {
        name: "온도",
        value: data.temperature,
        unit: "°C",
        icon: "temperature",
      },
      {
        name: "습도",
        value: data.relativeHumidity,
        unit: "%",
        icon: "relativeHumidity",
      },
      {
        name: "일사량",
        value: data.solarRadiation,
        unit: "W/㎡",
        icon: "solarRadiation",
      },
      {
        name: "CO2농도",
        value: data.co2,
        unit: "ppm",
        icon: "co2",
      },
      {
        name: "강우량",
        value: data.rainfall,
        unit: "mm",
        icon: "rainfall",
      },
      {
        name: "지온",
        value: data.earthTemperature,
        unit: "°C",
        icon: "earthTemperature",
      },
      {
        name: "대지습도",
        value: data.earthHumidity,
        unit: "%",
        icon: "earthHumidity",
      },
      {
        name: "풍향",
        value: data.windDirection,
        unit: "°",
        icon: "windDirection",
      },
      {
        name: "풍속",
        value: data.windSpeed,
        unit: "m/s",
        icon: "windSpeed",
      },
      {
        name: "작물 근접 온도",
        value: data.cropTemperature,
        unit: "°C",
        icon: "cropTemperature",
      },
      {
        name: "작물 근접 습도",
        value: data.cropHumidity,
        unit: "%",
        icon: "cropHumidity",
      },
    ],
    [data]
  );
  const siteSeq = useMemo(
    () => (selectedSite ? selectedSite.id : getUser().siteSeq),
    [getUser, selectedSite]
  );

  const getData = useCallback(async () => {
    const { config, data } = await requestSecureGet<RealTimeTypes>(
      `/v1/sites/${siteSeq}/realtime`,
      {},
      getToken()!
    );
    if (config.status >= 200 && config.status < 400) {
      setData(data);
    }
  }, [siteSeq, getToken]);

  useEffect(() => {
    const interval = setInterval(() => {
      getData();
    }, 3000);

    return () => {
      clearInterval(interval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [siteSeq]);

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <RealTime
      contents={contents}
      times={{ co2: data.co2RegTime, micro: data.microRegTime }}
      switchgear={{
        signal: data.openSignal,
        rate: data.rateOfOpening,
        time: data.openDataRegTime,
      }}
    />
  );
};

export default RealTimeContainer;
