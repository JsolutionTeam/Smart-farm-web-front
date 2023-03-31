import Login from "../Login";
import { useState } from "react";
import useLocalStorage from "@hooks/useLocalStorage";
import { requestPost } from "@lib/api";

type LoginResponseTypes = {
  accessToken: string;
  refreshToken: string;
  role: "ROLE_ADMIN" | "ROLE_USER";
  siteSeq: number;
};

const LoginContainer = () => {
  const { setToken, setUser } = useLocalStorage();
  const [inputs, setInputs] = useState<{
    [key in "username" | "password"]: string;
  }>({
    username: "",
    password: "",
  });

  const onChangeInputs = (e: { target: HTMLInputElement }) => {
    const { name, value } = e.target;

    setInputs((inputs) => ({
      ...inputs,
      [name]: value,
    }));
  };

  const login = async () => {
    if (inputs.username && inputs.password) {
      const { config, data } = await requestPost<LoginResponseTypes>(
        "/auth/login",
        {},
        inputs
      );
      if (config.status >= 200 && config.status < 400) {
        setToken(data.accessToken);
        setUser({
          role: data.role,
          siteSeq: data.siteSeq,
        });
        window.location.reload();
      } else {
        alert("아이디 또는 비밀번호를 잘못 입력했습니다.");
      }
    } else {
      alert("아이디와 비밀번호를 모두 입력해 주세요.");
    }
  };

  return <Login onChangeInputs={onChangeInputs} login={login} />;
};

export default LoginContainer;
