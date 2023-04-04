import { useState, useEffect } from "react";
import SensorManage from "../components/SensorManage";
import { useSearchParams } from "react-router-dom";
import useLocalStorage from "@hooks/useLocalStorage";
import { requestSecureGet, requestSecurePost } from "@lib/api";

export type SensorManageTypes = {
  ip: string;
  memo: string;
  modelName: string;
  serialNumber: string;
  sensorDeviceId: number;
  siteSeq: number;
  type: string;
};

const SensorManageContainer = () => {
  const { getToken } = useLocalStorage();
  const [searchParams] = useSearchParams();
  const [inputs, setInputs] = useState<SensorManageTypes>({
    ip: "",
    memo: "",
    modelName: "",
    serialNumber: "",
    sensorDeviceId: 0,
    siteSeq: 0,
    type: "",
  });

  const onChangeInputs = (e: { target: HTMLInputElement }) => {
    const { name, value } = e.target;

    setInputs((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {}, []);

  return <SensorManage {...{ inputs, onChangeInputs }} />;
};

export default SensorManageContainer;
