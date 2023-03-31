import { useState, useEffect } from "react";
import Account from "../Account";
import { useNavigate } from "react-router-dom";
import useLocalStorage from "@hooks/useLocalStorage";
import { requestSecureGet } from "@lib/api";
import { SiteTypes } from "@store/site/actions";

export type AccountTypes = {
  address: ""; // 주소
  email: ""; // 이메일
  phone: ""; // 전화번호
  role: "ROLE_ADMIN" | "ROLE_USER";
  site: SiteTypes;
  username: string; // 아이디 (관리자명)
};

const AccountContainer = () => {
  const navigate = useNavigate();
  const { getToken } = useLocalStorage();
  const [accounts, setAccounts] = useState<AccountTypes[]>([]);

  const manage = (id?: number) => {
    let url = "/site/account/manage";

    if (id) {
      url += `?accountId=${id}`;
    }

    navigate(url);
  };

  const getAccounts = async () => {
    const { config, data } = await requestSecureGet<AccountTypes[]>(
      "/admin/users",
      {},
      getToken()!
    );

    if (config.status >= 200 && config.status < 400) {
      setAccounts(data);
    } else {
      alert();
    }
  };

  useEffect(() => {
    getAccounts();
  }, []);

  return <Account accounts={accounts} manage={manage} />;
};

export default AccountContainer;
