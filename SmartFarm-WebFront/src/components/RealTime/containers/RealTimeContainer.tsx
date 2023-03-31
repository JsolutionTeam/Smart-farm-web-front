import RealTime from "../RealTime";
import { useState, useEffect, useMemo, useCallback } from "react";
import { requestSecureGet } from "@lib/api";
import useLocalStorage from "@hooks/useLocalStorage";
import useSelected from "@hooks/useSelected";
import { RealTimeTypes } from "@typedef/components/RealTime/real.time.types";
import { realTimeListTypes } from "@typedef/components/RealTime/real.time.list.types";
import { UnitTypes } from "@typedef/components/RealTime/unit.types";

const RealTimeContainer = () => {
  const { getToken, getUser } = useLocalStorage();
  const { getSelected } = useSelected();
  const siteSeq = useMemo(
    () => (getSelected().id ? getSelected().id : getUser().siteSeq),
    [getSelected, getUser]
  );
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
    rateOfOpening: 0,
    openSignal: 0,
    openDataRegTime: "",
  });
  const contents: realTimeListTypes[] = useMemo(
    () => [
      {
        name: "온도",
        value: realTimeData.temperature,
        unit: "°C",
        icon: "img.IcTemperature",
      },
      {
        name: "습도",
        value: realTimeData.relativeHumidity,
        unit: "%",
        icon: "img.IcHumidity",
      },
      {
        name: "일사량",
        value: realTimeData.solarRadiation,
        unit: "W/㎡",
        icon: "img.IcSun",
      },
      {
        name: "CO2농도",
        value: realTimeData.co2,
        unit: "ppm",
        icon: " img.IcCO2",
      },
      {
        name: "강우량",
        value: realTimeData.rainfall,
        unit: "mm",
        icon: "img.IcRain",
      },
      {
        name: "지온",
        value: realTimeData.earthTemperature,
        unit: "°C",
        icon: "img.IcGeothermal",
      },
      {
        name: "풍향",
        value: realTimeData.windDirection,
        unit: "°",
        icon: "img.IcWindDirection",
      },
      {
        name: "풍속",
        value: realTimeData.windSpeed,
        unit: "m/s",
        icon: "img.IcWindSpeed",
      },
    ],
    [realTimeData]
  );

  const setClassName = (unit: UnitTypes) => {
    let clasName: "" | "big" = "";

    if (unit === "°C" || unit === "%" || unit === "°") {
      clasName = "big";
    }

    return clasName;
  };

  const getRealTimeData = useCallback(async () => {
    const { config, data } = await requestSecureGet<RealTimeTypes>(
      `/v1/site/${siteSeq}/realtime`,
      {},
      getToken()!
    );
    if (config.status >= 200 && config.status < 400) {
      setRealTimeData(data);
    }
  }, [siteSeq, getToken]);

  useEffect(() => {
    const interval = setInterval(() => {
      getRealTimeData();
    }, 5000);
    return () => {
      clearInterval(interval);
    };
  }, [getRealTimeData]);

  useEffect(() => {
    getRealTimeData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <RealTime
      contents={contents}
      setClassName={setClassName}
      time={{ co2: realTimeData.co2RegTime, micro: realTimeData.microRegTime }}
      switchgear={{
        signal: realTimeData.openSignal,
        rate: realTimeData.rateOfOpening,
        time: realTimeData.openDataRegTime,
      }}
    />
  );
};

export default RealTimeContainer;
