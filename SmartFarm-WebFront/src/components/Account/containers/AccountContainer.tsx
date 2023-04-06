import { useState, useEffect } from "react";
import Account from "../Account";
import { useNavigate } from "react-router-dom";
import useLocalStorage from "@hooks/useLocalStorage";
import { requestSecureDelete, requestSecureGet } from "@lib/api";
import { SiteTypes } from "@store/site/actions";

export type AccountTypes = {
  address: ""; // 주소
  email: ""; // 이메일
  name: ""; // 관리자명
  phone: ""; // 전화번호
  role: "ROLE_ADMIN" | "ROLE_USER";
  site: SiteTypes;
  username: string; // 아이디 (관리자명)
};

const AccountContainer = () => {
  const navigate = useNavigate();
  const { getToken } = useLocalStorage();
  const [accounts, setAccounts] = useState<AccountTypes[]>([]);
  const [filter, setFilter] = useState<{
    type: string;
    value: string;
  }>({
    type: "name", // default 관리자명
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

  const manage = (username?: string) => {
    let url = "/site/account/manage";

    if (username) {
      url += `?username=${username}`;
    }

    navigate(url);
  };

  const deleteAccount = async (username: string) => {
    if (window.confirm("삭제하시겠습니까?")) {
      const { config } = await requestSecureDelete(
        `/admin/user/${username}`,
        {},
        getToken()!
      );

      if (config.status >= 200 && config.status < 400) {
        alert("성공적으로 삭제가 완료되었습니다.");
        setReload((prev) => prev + 1);
      }
    }
  };

  const getAccounts = async () => {
    let url = "/admin/users";

    if (filter.value) {
      url += `?${filter.type}=${filter.value}`;
    }

    const { config, data } = await requestSecureGet<AccountTypes[]>(
      url,
      {},
      getToken()!
    );

    if (config.status >= 200 && config.status < 400) {
      setAccounts(data);
    } else {
      alert("err");
    }
  };

  useEffect(() => {
    getAccounts();
  }, [reload]);

  return (
    <Account
      accounts={accounts}
      filter={filter}
      onChangeFilter={onChangeFilter}
      onKeyPressSearch={onKeyPressSearch}
      onClickFilterClear={onClickFilterClear}
      manage={manage}
      deleteAccount={deleteAccount}
    />
  );
};

export default AccountContainer;
