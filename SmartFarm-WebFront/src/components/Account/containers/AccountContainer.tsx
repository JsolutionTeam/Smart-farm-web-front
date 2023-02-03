import Account from "../Account";
import { useState, useEffect } from "react";
import { requestSecureDelete, requestSecureGet } from "@lib/api";
import useToken from "@hooks/useToken";
import { AccountTypes } from "@typedef/components/Account/account.types";
import { useNavigate } from "react-router-dom";

const AccountContainer = () => {
  const navigate = useNavigate();
  const { getToken } = useToken();
  const [tableData, setTableData] = useState<AccountTypes[]>([]);
  const [reload, setReload] = useState(0);

  const manage = (id?: number) => {
    let url = "/account/manage?type";
    if (id) {
      url += `=update&accountId=${id}`;
    } else {
      url += `=insert`;
    }

    navigate(url);
  };

  const remove = async (username: string) => {
    const { config } = await requestSecureDelete(
      `/admin/user/${username}`,
      {},
      getToken()!
    );

    if (config.status >= 200 && config.status < 400) {
      alert("성공적으로 삭제가 완료되었습니다.");
      setReload((prev) => prev + 1);
    }
  };

  const getTabeData = async () => {
    const { config, data } = await requestSecureGet<AccountTypes[]>(
      "/admin/users",
      {},
      getToken()!
    );

    if (config.status >= 200 && config.status < 400) {
      setTableData(data);
    }
  };

  useEffect(() => {
    getTabeData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reload]);

  return <Account tableData={tableData} manage={manage} remove={remove} />;
};

export default AccountContainer;
