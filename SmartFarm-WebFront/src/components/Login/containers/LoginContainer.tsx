import Login from '../Login';
import { useState } from 'react';
import { apiRoute, requestPost } from '@lib/api';
import useToken from '@hooks/useToken';

const LoginContainer = () => {
  const { setToken } = useToken();
  const [inputs, setInputs] = useState<{ id: string; passwd: string }>({
    id: '',
    passwd: '',
  });

  const onChangeInputs = (e: { target: HTMLInputElement }) => {
    const { name, value } = e.target;
    setInputs((inputs) => ({
      ...inputs,
      [name]: value,
    }));
  };

  const onClickLogin = async () => {
    if (inputs.id && inputs.passwd) {
      const { config, data } = await requestPost<{ accessToken: string }>(
        apiRoute.auth.login,
        {},
        {
          username: inputs.id,
          password: inputs.passwd,
        },
      );
      if (config.status >= 200 && config.status < 400) {
        setToken(data.accessToken);
        window.location.reload();
      } else {
        alert('아이디 또는 비밀번호를 잘못 입력했습니다.');
      }
    } else {
      alert('아이디와 비밀번호를 모두 입력해 주세요.');
    }
  };

  return <Login onChangeInputs={onChangeInputs} onClickLogin={onClickLogin} />;
};

export default LoginContainer;
