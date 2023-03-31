import AccountManage from "../components/AccountManage";
import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useLocalStorage from "@hooks/useLocalStorage";
import {
  requestSecureGet,
  requestSecurePost,
  requestSecurePut,
} from "@lib/api";

import { AccountTypes } from "@typedef/components/Site/account.types";
import { SiteTypes } from "@typedef/components/Site/site.types";

type AccountManageTypes = AccountTypes & {
  password: string;
};

const AccountManageContainer = () => {
  const navigate = useNavigate();
  // insert ? null : AccountTypes
  const { state } = useLocation();
  const { getToken } = useLocalStorage();
  const [type, setType] = useState<"insert" | "update">("insert");
  const [inputs, setInputs] = useState<AccountManageTypes>({
    password: "",
    role: "ROLE_ADMIN",
    site: {
      id: 0,
      name: "",
    },
    username: "",
  });
  const [msgs, setMsgs] = useState<{
    [input in "username" | "passwd" | "confirmPasswd"]: string;
  }>({
    username: "",
    passwd: "",
    confirmPasswd: "",
  });
  const [sites, setSites] = useState<SiteTypes[]>([]);
  const [visibleSites, setVisibleSites] = useState(false);
  const siteRef = useRef<HTMLDivElement>(null);

  const onChangeInputs = (
    input: "role" | "username" | "password" | "site",
    value: string | number | SiteTypes
  ) => {
    setInputs((prev) => ({ ...prev, [input]: value }));
  };

  const onChangeMsgs = (
    msg: "username" | "passwd" | "confirmPasswd",
    value: string
  ) => {
    setMsgs((prev) => ({
      ...prev,
      [msg]: value,
    }));
  };

  // 아이디 중복확인
  const onChangeUsername = async (id: string) => {
    if (!id) return;

    const { config, data } = await requestSecureGet(
      `/admin/users/exist/${id}`,
      {},
      getToken()!
    );

    if (config.status >= 200 && config.status < 400) {
      if (data === true) {
        onChangeInputs("username", "");
        onChangeMsgs("username", "이미 존재하는 아이디입니다.");
        return;
      }
      onChangeInputs("username", id);
      onChangeMsgs("username", "");
    }
  };

  // 비밀번호
  const onChangePasswd = (passwd: string) => {
    if (!passwd) return;

    // 비밀번호는 4자 이상
    if (passwd.length < 4) {
      onChangeInputs("password", "");
      onChangeMsgs("passwd", "4자 이상 입력해 주세요.");
      return;
    }

    onChangeInputs("password", passwd);
    onChangeMsgs("passwd", "");
  };

  // 비밀번호 확인
  const onChangeConfirmPasswd = (passwd: string) => {
    if (!passwd) return;

    if (inputs.password !== passwd) {
      onChangeMsgs("confirmPasswd", "일치하지 않습니다.");
      return;
    }

    onChangeMsgs("confirmPasswd", "일치합니다.");
  };

  // inputs 유효성 검사
  const validateInputs = () => {
    let message = "";
    if (!inputs.site.id) message = "농가를 선택해";
    else if (!inputs.username) message = "아이디를 입력해";
    else if (!inputs.password) message = "비밀번호를 입력해";
    else if (msgs.confirmPasswd !== "일치합니다.")
      message = "비밀번호 확인을 입력해";

    return message;
  };

  // 계정 생성
  const insert = async () => {
    const message = validateInputs();

    if (message) {
      alert(`${message} 주세요.`);
      return;
    }

    const { config } = await requestSecurePost(
      "/admin/user",
      {},
      {
        username: inputs.username,
        password: inputs.password,
        role: inputs.role,
        siteSeq: inputs.site.id,
      },
      getToken()!
    );

    if (config.status >= 200 && config.status < 400) {
      alert("성공적으로 등록이 완료되었습니다.");
      navigate("/site");
    }
  };

  // 계정 수정
  const update = async () => {
    const { config } = await requestSecurePut(
      "/admin/user",
      {},
      {
        username: inputs.username,
        password: inputs.password,
        role: inputs.role,
        siteSeq: inputs.site.id,
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
      setInputs((prev) => ({
        ...prev,
        ...state,
      }));
      onChangeMsgs("username", "아이디는 수정할 수 없습니다.");
    }
  }, [state]);

  useEffect(() => {
    async function getSites() {
      const { config, data } = await requestSecureGet<SiteTypes[]>(
        "/v1/site/list",
        {},
        getToken()!
      );

      if (config.status >= 200 && config.status < 400) {
        setSites(data);
      }
    }

    getSites();
  }, [getToken]);

  return (
    <AccountManage
      type={type === "insert" ? "생성" : "수정"}
      inputs={inputs}
      msgs={msgs}
      sites={sites}
      visibleSites={visibleSites}
      siteRef={siteRef}
      onChangeVisibleSite={(visible: boolean) => setVisibleSites(visible)}
      onChangeInputs={onChangeInputs}
      onChangeUsername={onChangeUsername}
      onChangePasswd={onChangePasswd}
      onChangeConfirmPasswd={onChangeConfirmPasswd}
      save={type === "insert" ? insert : update}
    />
  );
};

export default AccountManageContainer;
