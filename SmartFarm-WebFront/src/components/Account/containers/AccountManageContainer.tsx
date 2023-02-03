import AccountManage from "../components/AccountManage";
import { useState, useEffect, useCallback } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import useToken from "@hooks/useToken";
import {
  requestSecureGet,
  requestSecurePost,
  requestSecurePut,
} from "@lib/api";
import { AccountTypes } from "@typedef/components/Account/account.types";

type AccountManageTypes = AccountTypes & {
  password: string;
};

const AccountManageContainer = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { getToken } = useToken();
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

  const onChangeInputs = (
    input: "role" | "site.id" | "username" | "password",
    value: string | number
  ) => {
    const isSiteInput = input.includes("site");

    setInputs((prev) =>
      isSiteInput
        ? {
            ...prev,
            site: {
              ...prev.site,
              id: value as number,
            },
          }
        : { ...prev, [input]: value }
    );
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

    if (!inputs.password) {
      onChangeMsgs("confirmPasswd", "비밀번호 먼저 입력해 주세요");
      return;
    }

    if (inputs.password !== passwd) {
      onChangeMsgs("confirmPasswd", "일치하지 않습니다.");
      return;
    }

    onChangeMsgs("confirmPasswd", "");
  };

  // 계정 생성
  const insert = async () => {
    console.log("insert");
    const { config } = await requestSecurePost(
      "/admin/user",
      {},
      {
        username: inputs.username,
        passwod: inputs.password,
        role: inputs.role,
        siteSeq: inputs.site.id,
      },
      getToken()!
    );

    if (config.status >= 200 && config.status < 400) {
      alert("성공적으로 등록이 완료되었습니다.");
      navigate("/account");
    }
  };

  // 계정 수정
  const update = async () => {
    console.log("update");
    const { config } = await requestSecurePut(
      "/admin/user",
      {},
      inputs,
      getToken()!
    );

    if (config.status >= 200 && config.status < 400) {
      alert("성공적으로 등록이 완료되었습니다.");
      navigate("/account");
    }
  };

  const getDataByAccountId = useCallback(
    async (id: string) => {
      const { config, data } = await requestSecureGet<AccountTypes>(
        `/admin/users/${id}`,
        {},
        getToken()!
      );

      if (config.status >= 200 && config.status < 400) {
        setInputs({ ...data, password: "" });
      }
    },
    [getToken]
  );

  useEffect(() => {
    const accountId = searchParams.get("accountId");

    if (accountId) {
      getDataByAccountId(accountId);
    }
  }, [getDataByAccountId, searchParams]);

  return (
    <AccountManage
      type={inputs.site.id ? "수정" : "생성"}
      inputs={inputs}
      msgs={msgs}
      onChangeInputs={onChangeInputs}
      onChangeUsername={onChangeUsername}
      onChangePasswd={onChangePasswd}
      onChangeConfirmPasswd={onChangeConfirmPasswd}
      save={inputs.site.id ? update : insert}
    />
  );
};

export default AccountManageContainer;
