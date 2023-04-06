import { useState, useEffect, useRef } from "react";
import SensorManage from "../components/SensorManage";
import { useNavigate, useSearchParams } from "react-router-dom";
import useLocalStorage from "@hooks/useLocalStorage";
import {
  requestSecureGet,
  requestSecurePost,
  requestSecurePut,
} from "@lib/api";
import { SensorTypes } from "./SensorContainer";
import { SiteTypes } from "@store/site/actions";

export type SensorManageTypes = {
  imgPath: string;
  ip: string;
  memo: string;
  modelName: string;
  serialNumber: string;
  sensorDeviceId: number;
  siteName: string;
  siteSeq: number;
  type: string;
  unit: string;
};

const SensorManageContainer = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { getToken } = useLocalStorage();
  const [inputs, setInputs] = useState<SensorManageTypes>({
    imgPath: "",
    ip: "",
    memo: "",
    modelName: "",
    serialNumber: "",
    sensorDeviceId: 0,
    siteName: "",
    siteSeq: 0,
    type: "",
    unit: "",
  });
  const [sensorImg, setSensorImg] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [sites, setSites] = useState<SiteTypes[]>([]);
  const [isVisible, setIsVisible] = useState<{
    [key in "type" | "site"]: boolean;
  }>({
    type: false,
    site: false,
  });
  const typeSelectRef = useRef<HTMLDivElement>(null);
  const siteSelectRef = useRef<HTMLDivElement>(null);

  // select visible 설정
  const visibleHandler = (key: "type" | "site", visible: boolean) => {
    setIsVisible((prev) => ({
      ...prev,
      [key]: visible,
    }));
  };

  const onChangeInputs = (e: { target: HTMLInputElement }) => {
    const { name, value } = e.target;

    setInputs((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // 센서타입 선택
  const onClickType = (type: string) => {
    setInputs((prev) => ({
      ...prev,
      type: type,
    }));

    visibleHandler("type", false);
  };

  // 사용 농가계정 선택
  const onClickSite = (siteName: string, siteSeq: number) => {
    setInputs((prev) => ({
      ...prev,
      siteName: siteName,
      siteSeq: siteSeq,
    }));

    visibleHandler("site", false);
  };

  // 센서 이미지 업로드
  const onChangeSensorImg = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formData = new FormData();

    if (e.target.files) {
      const file = e.target.files[0];
      formData.append("file", file);
      setSensorImg(file);

      const imageUrl = URL.createObjectURL(file);
      setPreviewUrl(imageUrl);
    }
  };

  // inputs 유효성
  const validationInputs = () => {
    let message: null | string = null;

    if (!inputs.type) message = "센서타입을";
    else if (!inputs.modelName) message = "모델명";
    else if (!inputs.serialNumber) message = "시리얼넘버";
    else if (!inputs.ip) message = "ip를";

    return message;
  };

  const uploadImg = async (type: "등록" | "수정", id: number) => {
    const { config } = await requestSecurePut(
      `/v1/sensor-devices/${id}/image`,
      {
        "Content-Type": "multipart/form-data",
      },
      { imgFile: sensorImg },
      getToken()!
    );

    if (config.status >= 200 && config.status < 400) {
      alert(`성공적으로 ${type}이 완료되었습니다.`);
      navigate("/site/sensor");
    } else {
      alert(
        "죄송합니다. 이미지 등록 중 문제가 발생했습니다. 나중에 다시 시도해주세요."
      );
    }
  };

  // 등록
  const insert = async () => {
    const message = validationInputs();

    if (message) {
      alert(`${message} 입력해 주세요.`);
      return;
    }

    const { config, data: id } = await requestSecurePost<number>(
      "/v1/sensor-device",
      {},
      inputs,
      getToken()!
    );

    if (config.status >= 200 && config.status < 400) {
      if (sensorImg) {
        uploadImg("등록", id);
      } else {
        alert("성공적으로 등록이 완료되었습니다.");
        navigate("/site/sensor");
      }
    }
  };

  // 수정
  const update = async () => {
    const message = validationInputs();

    if (message) {
      alert(`${message} 입력해 주세요.`);
      return;
    }

    const { config } = await requestSecurePut(
      `/v1/sensor-devices/${inputs.sensorDeviceId}`,
      {},
      inputs,
      getToken()!
    );

    if (config.status >= 200 && config.status < 400) {
      if (config.status >= 200 && config.status < 400) {
        if (sensorImg) {
          uploadImg("수정", inputs.sensorDeviceId);
        } else {
          alert("성공적으로 수정이 완료되었습니다.");
          navigate("/site/sensor");
        }
      }
    }
  };

  const getSites = async () => {
    const { config, data } = await requestSecureGet<SiteTypes[]>(
      "/v1/site/list",
      {},
      getToken()!
    );

    if (config.status >= 200 && config.status < 400) {
      setSites(data);
    }
  };

  const getDataBySensorDeviceId = async (sensorDeviceId: string) => {
    const { config, data } = await requestSecureGet<SensorTypes[]>(
      `/v1/sensor-devices/${sensorDeviceId}`,
      {},
      getToken()!
    );

    if (config.status >= 200 && config.status < 400) {
      setInputs((prev) => ({
        ...prev,
        ...data,
      }));
    } else {
      alert("");
    }
  };

  useEffect(() => {
    const sensorDeviceId = searchParams.get("sensorDeviceId");

    if (sensorDeviceId) {
      getDataBySensorDeviceId(sensorDeviceId);
    }

    getSites();
  }, []);

  return (
    <SensorManage
      {...{
        inputs,
        onChangeInputs,
        insert,
        update,
        isVisible,
        visibleHandler,
        typeSelectRef,
        siteSelectRef,
        onClickType,
        onClickSite,
        sites,
        onChangeSensorImg,
        sensorImg,
        previewUrl,
      }}
    />
  );
};

export default SensorManageContainer;
