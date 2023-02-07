import Site from "../Site";
import { useState, useEffect, useCallback } from "react";
import {
  requestSecureDelete,
  requestSecureGet,
  requestSecurePut,
} from "@lib/api";
import { useNavigate } from "react-router-dom";
import useToken from "@hooks/useToken";
import { SiteTypes } from "@typedef/components/Site/site.types";
import { AccountTypes } from "@typedef/components/Site/account.types";
import useModal from "@hooks/stories/useModal";
import SiteManageContainer from "./SiteManageContainer";

const SiteContainer = () => {
  const navigate = useNavigate();
  const { getToken } = useToken();
  const { __modalVisibleActionFromHooks } = useModal();
  const [sites, setSites] = useState<SiteTypes[]>([]);
  const [editSite, setEditSite] = useState({
    id: 0,
    name: "",
  });
  const [accounts, setAccounts] = useState<AccountTypes[]>([]);
  const [reload, setReload] = useState(0);

  // const manage = (type: "insert" | "update", kind: "site" | "account") => {
  //   __modalVisibleActionFromHooks(
  //     <SiteManageContainer type={type} site={null} />
  //   );
  // };

  const updateSite = async () => {
    const { config } = await requestSecurePut(
      `/v1/${editSite.id}`,
      {},
      { name: editSite.name },
      getToken()!
    );

    if (config.status >= 200 && config.status < 400) {
      alert("성공적으로 수정이 완료되었습니다.");
      setReload((prev) => prev + 1);
      setEditSite({
        id: 0,
        name: "",
      });
    }
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

  const remove = async (kind: "site" | "account", id: number | string) => {
    if (window.confirm(`삭제하시겠습니까?`)) {
      const url = kind === "site" ? `/v1/${id}` : `/admin/user/${id}`;

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
      editSite={editSite}
      onClickEditSite={(site: SiteTypes) => setEditSite(site)}
      onChangeEditSite={(name: string) =>
        setEditSite((prev) => ({ ...prev, name: name }))
      }
      updateSite={updateSite}
      manageAccount={manageAccount}
      remove={remove}
    />
  );
};

export default SiteContainer;
