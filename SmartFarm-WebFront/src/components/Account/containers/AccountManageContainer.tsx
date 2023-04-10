import { useState, useEffect } from "react";
import AccountManage from "../components/AccountManage";
import { useNavigate, useSearchParams } from "react-router-dom";
import useLocalStorage from "@hooks/useLocalStorage";
import {
  requestSecureGet,
  requestSecurePost,
  requestSecurePut,
} from "@lib/api";
import { AccountTypes } from "./AccountContainer";

export type AccountManageTypes = {
  address: string; // 농가주소
  email: string; // 이메일
  name: string; // 관리자명
  password: string; // 비밀번호
  phone: string; // 전화번호
  role: "ROLE_ADMIN" | "ROLE_USER";
  siteCrop: string; // 작물
  siteLocation: string; // 지역
  siteName: string; // 농가명
  username: string; // 아이디
};

const AccountManageContainer = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { getToken } = useLocalStorage();
  const [type, setType] = useState<"등록하기" | "상세보기">("등록하기");
  const [inputs, setInputs] = useState<AccountManageTypes>({
    address: "",
    email: "",
    name: "",
    password: "",
    phone: "",
    role: "ROLE_USER",
    siteCrop: "",
    siteLocation: "",
    siteName: "",
    username: "",
  });
  const [msgs, setMsgs] = useState<{ [inputs in "username"]: string }>({
    username: "",
  });

  const onChangeInputs = (e: { target: HTMLInputElement }) => {
    const { name, value } = e.target;

    // 전화번호 숫자만 입력
    if (name === "phone") {
      if (!/^[0-9\b]+$/.test(value)) {
        return;
      }
    }

    setInputs((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onChangeMsgs = (input: "username", msg: string) => {
    setMsgs((prev) => ({
      prev,
      [input]: msg,
    }));
  };

  // 아이디 중복확인
  const validationUsername = async () => {
    const { config, data } = await requestSecureGet<boolean>(
      `/admin/users/exist/${inputs.username}`,
      {},
      getToken()!
    );

    if (config.status >= 200 && config.status < 400) {
      // data : true (존재함) | false (존재하지않음)
      if (data === true) {
        onChangeMsgs("username", "이미 존재하는 아이디입니다.");
      } else {
        onChangeMsgs("username", "");
      }
    }
  };

  const onClickClearUsername = () => {
    setInputs((prev) => ({
      ...prev,
      username: "",
    }));
    onChangeMsgs("username", "");
  };

  const onClickRole = (selected: "ADMIN" | "USER") => {
    setInputs((prev) => ({
      ...prev,
      role: `ROLE_${selected}`,
    }));
  };

  // inputs 유효성 검사
  const validationInputs = () => {
    let message: null | string = null;
    if (!inputs.name) message = "관리자명을";
    else if (!inputs.siteLocation) message = "지역을";
    else if (!inputs.siteCrop) message = "작물을";
    else if (!inputs.username) message = "아이디를";
    else if (msgs.username) message = "올바른 아이디를";
    else if (type === "등록하기" && !inputs.password) message = "비밀번호를";
    else if (!inputs.siteName) message = "농가명을";
    else if (
      inputs.email &&
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inputs.email) === false
    )
      message = "올바른 이메일 형식으로";

    return message;
  };

  const insert = async () => {
    const message = validationInputs();

    if (message) {
      alert(`${message} 입력해 주세요.`);
      return;
    }

    const { config } = await requestSecurePost(
      "/admin/user",
      {},
      inputs,
      getToken()!
    );

    if (config.status >= 200 && config.status < 400) {
      alert("성공적으로 등록이 완료되었습니다.");
      navigate("/site/account");
    }
  };

  const update = async () => {
    const message = validationInputs();

    if (message) {
      alert(`${message} 입력해 주세요.`);
      return;
    }

    const { config } = await requestSecurePut(
      "/admin/user",
      {},
      inputs,
      getToken()!
    );

    if (config.status >= 200 && config.status < 400) {
      alert("성공적으로 수정이 완료되었습니다.");
      navigate("/site/account");
    }
  };

  const getDataByAccountId = async (username: string) => {
    const { config, data } = await requestSecureGet<AccountTypes>(
      `/admin/users/${username}`,
      {},
      getToken()!
    );

    if (config.status >= 200 && config.status < 400) {
      setInputs({
        address: data.address,
        email: data.email,
        name: data.name,
        password: "",
        phone: data.phone,
        role: data.role,
        siteCrop: data.site.crop,
        siteLocation: data.site.location,
        siteName: data.site.name,
        username: data.username,
      });
    }
  };

  useEffect(() => {
    const username = searchParams.get("username");

    if (username) {
      setType("상세보기");
      getDataByAccountId(username);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AccountManage
      {...{
        type,
        inputs,
        onChangeInputs,
        validationUsername,
        onClickClearUsername,
        onClickRole,
        msgs,
        insert,
        update,
      }}
    />
  );
};

export default AccountManageContainer;
