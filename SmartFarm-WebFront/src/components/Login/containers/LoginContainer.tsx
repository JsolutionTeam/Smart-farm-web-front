import Login from "../Login";
import { useState } from "react";
import { requestPost } from "@lib/api";
import useToken from "@hooks/useToken";
import useUser from "@hooks/useUser";

const LoginContainer = () => {
  const { setToken } = useToken();
  const { setUser } = useUser();
  const [inputs, setInputs] = useState<{ [key in "id" | "passwd"]: string }>({
    id: "",
    passwd: "",
  });

  const onChangeInputs = (e: { target: HTMLInputElement }) => {
    const { name, value } = e.target;

    setInputs((inputs) => ({
      ...inputs,
      [name]: value,
    }));
  };

  const login = async () => {
    if (inputs.id && inputs.passwd) {
      const { config, data } = await requestPost<{
        accessToken: string;
        role: "ROLE_ADMIN" | "ROLE_USER";
        siteSeq: number;
      }>(
        "/auth/login",
        {},
        {
          username: inputs.id,
          password: inputs.passwd,
        }
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
