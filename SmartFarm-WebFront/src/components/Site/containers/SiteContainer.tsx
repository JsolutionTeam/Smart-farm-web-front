import Site from "../Site";
import { useState, useEffect, useCallback } from "react";
import { requestSecureDelete, requestSecureGet } from "@lib/api";
import { useNavigate } from "react-router-dom";
import { SiteTypes } from "@typedef/components/Site/site.types";
import { AccountTypes } from "@typedef/components/Site/account.types";
import useLocalStorage from "@hooks/useLocalStorage";

const SiteContainer = () => {
  const navigate = useNavigate();
  const { getToken } = useLocalStorage();
  const [sites, setSites] = useState<SiteTypes[]>([]);
  const [accounts, setAccounts] = useState<AccountTypes[]>([]);
  const [toggle, setToggle] = useState<{
    [kind in "sites" | "accounts"]: boolean;
  }>({
    sites: false,
    accounts: false,
  });
  const [reload, setReload] = useState(0);

  const onChangeToggle = (kind: "sites" | "accounts") => {
    setToggle((prev) => ({
      ...prev,
      [kind]: !prev[kind],
    }));
  };

  // 농가 관리 페이지 이동 (생성, 수정)
  const manageSite = (site: SiteTypes | null) => {
    let url = "/site/manage?type=";

    if (site) {
      url += "update";
    } else {
      url += "insert";
    }

    navigate(url, { state: site });
  };

  // 계정 관리 페이지 이동 (생성, 수정)
  const manageAccount = (account: AccountTypes | null) => {
    let url = "/site/account/manage?type=";

    if (account) {
      url += "update";
    } else {
      url += "insert";
    }

    navigate(url, { state: account });
  };

  // 농가 / 계정 삭제
  const remove = async (kind: "site" | "account", id: number | string) => {
    if (window.confirm(`삭제하시겠습니까?`)) {
      const url = kind === "site" ? `/v1/site/${id}` : `/admin/user/${id}`;

      const { config } = await requestSecureDelete(url, {}, getToken()!);

      if (config.status >= 200 && config.status < 400) {
        alert("성공적으로 삭제가 완료되었습니다.");
        setReload((prev) => prev + 1);
      }
    }
  };

  const getData = useCallback(async () => {
    const getSites = () => {
      return requestSecureGet<SiteTypes[]>(`/v1/site/list`, {}, getToken()!);
    };

    const getAccounts = () => {
      return requestSecureGet<AccountTypes[]>("/admin/users", {}, getToken()!);
    };

    Promise.all(
      [getSites, getAccounts].map(
        (req) =>
          new Promise((resolve, reject) =>
            req().then((res) => {
              if (res.config.status >= 200 && res.config.status < 400) {
                resolve(res.data);
              } else {
                reject(`http request failed with ${res.config.status}`);
              }
            })
          )
      )
    ).then((res) => {
      setSites(res[0] as SiteTypes[]);
      setAccounts(res[1] as AccountTypes[]);
    });
  }, [getToken]);

  useEffect(() => {
    getData();
  }, [getData, reload]);

  return (
    <Site
      sites={sites}
      accounts={accounts}
      toggle={toggle}
      manageSite={manageSite}
      manageAccount={manageAccount}
      remove={remove}
      onChangeToggle={onChangeToggle}
    />
  );
};

export default SiteContainer;
