import SiteManage from "../components/SiteManage";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useLocalStorage from "@hooks/useLocalStorage";
import { SiteTypes } from "@typedef/components/Site/site.types";
import {
  requestSecureGet,
  requestSecurePost,
  requestSecurePut,
} from "@lib/api";

const SiteManageContainer = () => {
  const navigate = useNavigate();
  // insert ? null : AccountTypes
  const { state } = useLocation();
  const { getToken } = useLocalStorage();
  const [type, setType] = useState<"insert" | "update">("insert");
  const [inputs, setInputs] = useState<SiteTypes>({
    id: 0,
    name: "",
  });
  const [msgs, setMsgs] = useState<{
    [input in "id"]: string;
  }>({
    id: "",
  });

  const onChangeInputs = (e: { target: HTMLInputElement }) => {
    const { name, value } = e.target;

    setInputs((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onChangeId = async (id: number) => {
    if (id === 0) {
      setMsgs((prev) => ({
        ...prev,
        id: `"0"은 농가번호로 사용할 수 없습니다.`,
      }));
      return;
    }

    const { config, data } = await requestSecureGet(
      `/v1/site/exist/${id}`,
      {},
      getToken()!
    );

    if (config.status >= 200 && config.status < 400) {
      if (data === true) {
        setInputs((prev) => ({ ...prev, id: 0 }));
        setMsgs((prev) => ({ ...prev, id: "이미 존재하는 농가번호입니다." }));
        return;
      }

      setInputs((prev) => ({ ...prev, id: id }));
      setMsgs((prev) => ({ ...prev, id: "" }));
    }
  };

  const validateInputs = () => {
    let message = "";
    if (!inputs.id) message = "농가번호를";
    else if (!inputs.name) message = "농가명을";

    return message;
  };

  const insert = async () => {
    const message = validateInputs();

    if (message) {
      alert(`${message} 입력해 주세요.`);
      return;
    }

    const { config } = await requestSecurePost(
      "/v1/site",
      {},
      inputs,
      getToken()!
    );

    if (config.status >= 200 && config.status < 400) {
      alert("성공적으로 등록이 완료되었습니다.");
      navigate("/site");
    }
  };

  const update = async () => {
    const message = validateInputs();

    if (message) {
      alert(`${message} 입력해 주세요.`);
      return;
    }

    const { config } = await requestSecurePut(
      `/v1/site/${inputs.id}`,
      {},
      {
        name: inputs.name,
      },
      getToken()!
    );

    if (config.status >= 200 && config.status < 400) {
      alert("성공적으로 수정이 완료되었습니다.");
      navigate("/site");
    }
  };

  useEffect(() => {
    if (state) {
      setType("update");
      setInputs(state as SiteTypes);
      setMsgs((prev) => ({ ...prev, id: "농가번호는 수정할 수 없습니다." }));
    }
  }, [state]);

  return (
    <SiteManage
      type={type === "insert" ? "생성" : "수정"}
      inputs={inputs}
      msgs={msgs}
      onChangeInputs={onChangeInputs}
      onChangeId={onChangeId}
      save={type === "insert" ? insert : update}
    />
  );
};

export default SiteManageContainer;
