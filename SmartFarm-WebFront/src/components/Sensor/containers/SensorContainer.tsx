import { useEffect, useState } from "react";
import Sensor from "../Sensor";
import { useNavigate } from "react-router-dom";
import useLocalStorage from "@hooks/useLocalStorage";
import { requestSecureGet } from "@lib/api";

export type SensorTypes = {};

const SensorContainer = () => {
  const navigate = useNavigate();
  const { getToken } = useLocalStorage();
  const [sensors, setSensors] = useState<SensorTypes[]>([]);

  const manage = (id?: number) => {
    let url = "/site/sensor/manage";

    if (id) {
      url += `?sensorId=${id}`;
    }

    navigate(url);
  };

  const getSensors = async () => {
    const { config, data } = await requestSecureGet<SensorTypes[]>(
      "/v1/sensorDevices",
      {},
      getToken()!
    );

    if (config.status >= 200 && config.status < 400) {
      setSensors(data);
    } else {
      alert("");
    }
  };

  useEffect(() => {
    getSensors();
  }, []);

  return <Sensor sensors={sensors} manage={manage} />;
};

export default SensorContainer;
