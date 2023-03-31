import { useState, useEffect } from "react";
import AccountManage from "../components/AccountManage";
import { useSearchParams } from "react-router-dom";
import useLocalStorage from "@hooks/useLocalStorage";
import { requestSecureGet } from "@lib/api";

export type AccountManageTypes = {
  address: string;
  crop: string;
  email: string;
  location: string;
  name: string;
  password: string;
  phone: string;
  role: "ROLE_ADMIN" | "ROLE_USER";
  username: string;
};

const AccountManageContainer = () => {
  const { getToken } = useLocalStorage();
  const [searchParams] = useSearchParams();
  const [inputs, setInputs] = useState<AccountManageTypes>({
    address: "",
    crop: "",
    email: "",
    location: "",
    name: "",
    password: "",
    phone: "",
    role: "ROLE_USER",
    username: "",
  });

  const onChangeInputs = (e: { target: HTMLInputElement }) => {
    const { name, value } = e.target;

    setInputs((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const getDataByAccountId = async (id: string) => {
    const { config, data } = await requestSecureGet(
      `/admin/users/${id}`,
      {},
      getToken()!
    );

    if (config.status >= 200 && config.status < 400) {
    }
  };

  useEffect(() => {
    const accountId = searchParams.get("accountId");

    if (accountId) {
      getDataByAccountId(accountId);
    }
  }, []);

  return <AccountManage inputs={inputs} onChangeInputs={onChangeInputs} />;
};

export default AccountManageContainer;
