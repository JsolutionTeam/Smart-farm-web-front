import { useEffect, useState } from "react";
import Sensor from "../Sensor";
import { useNavigate } from "react-router-dom";
import useLocalStorage from "@hooks/useLocalStorage";
import { requestSecureDelete, requestSecureGet } from "@lib/api";

export type SensorTypes = {
  ip: string;
  memo: string;
  modelName: string;
  serialNumber: string;
  sensorDeviceId: number;
  siteName: string;
  type: string;
};

const SensorContainer = () => {
  const navigate = useNavigate();
  const { getToken } = useLocalStorage();
  const [sensors, setSensors] = useState<SensorTypes[]>([]);
  const [filter, setFilter] = useState<{
    type: string;
    value: string;
  }>({
    type: "type", // default 센서타입
    value: "",
  });
  const [reload, setReload] = useState(0);

  const onChangeFilter = (key: "type" | "value", value: string) => {
    setFilter((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const onKeyPressSearch = () => {
    if (!filter.value) return;

    setReload((prev) => prev + 1);
  };

  const onClickFilterClear = () => {
    onChangeFilter("value", "");
    setReload((prev) => prev + 1);
  };

  const manage = (id?: number) => {
    let url = "/sensor/manage";

    if (id) {
      url += `?sensorDeviceId=${id}`;
    }

    navigate(url);
  };

  const deleteSensor = async (id: number) => {
    if (window.confirm("삭제하시겠습니까?")) {
      const { config } = await requestSecureDelete(
        `/v1/sensor-devices/${id}`,
        {},
        getToken()!
      );

      if (config.status >= 200 && config.status < 400) {
        alert("성공적으로 삭제가 완료되었습니다.");
        setReload((prev) => prev + 1);
      }
    }
  };

  const getSensors = async () => {
    let url = "/v1/sensor-devices";

    if (filter.value) {
      url += `?${filter.type}=${filter.value}`;
    }

    const { config, data } = await requestSecureGet<SensorTypes[]>(
      url,
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reload]);

  return (
    <Sensor
      sensors={sensors}
      filter={filter}
      onChangeFilter={onChangeFilter}
      onKeyPressSearch={onKeyPressSearch}
      onClickFilterClear={onClickFilterClear}
      manage={manage}
      deleteSensor={deleteSensor}
    />
  );
};

export default SensorContainer;
