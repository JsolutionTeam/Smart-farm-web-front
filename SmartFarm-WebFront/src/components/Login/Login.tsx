import styled from "styled-components";
import img from "@assets/image";

type Props = {
  onChangeInputs: (e: { target: HTMLInputElement }) => void;
  onClickLogin: () => Promise<void>;
};

const Login = ({ onChangeInputs, onClickLogin }: Props) => {
  return (
    <Container>
      <header>
        <h3>환경 데이터 모니터링</h3>
      </header>
      <LoginContainer>
        <p className="subtitle">로그인</p>
        <Inputs>
          <input
            type="text"
            name="id"
            onChange={onChangeInputs}
            autoFocus
            placeholder="아이디"
          />
          <input
            type="password"
            name="passwd"
            onChange={onChangeInputs}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                onClickLogin();
              }
            }}
            placeholder="비밀번호"
          />
          <button type="button" onClick={onClickLogin}>
            로그인
          </button>
        </Inputs>
      </LoginContainer>
    </Container>
  );
};

export default Login;

const radius = "8px";
const space = "60px";

export const Container = styled.main`
  min-height: 100vh;

  header {
    line-height: 60px;
    background-color: #fff;
    text-align: center;

    @media ${({ theme }) => theme.media.mobile} {
      padding-left: 20px;
      text-align: left;
    }
  }
`;

export const LoginContainer = styled.section`
  width: 500px;
  ${({ theme }) => theme.flex.col}
  align-items: center;
  margin: 0 auto;
  transform: translate(0, 50%);
  background-color: #fff;
  border: 1px solid #d8d8d8;
  border-radius: ${radius};

  .subtitle {
    margin: 40px 0 20px;
    font-size: 18px;
    font-weight: 600;
  }

  @media ${({ theme }) => theme.media.mobile} {
    width: calc(100% - 40px);
  }
`;

export const Inputs = styled.section`
  width: 100%;
  ${({ theme }) => theme.flex.col}
  align-items: center;
  padding: 20px;

  input {
    width: 100%;
    height: ${space};
    border: 1px solid #d8d8d8;
    background-position: 16px center;
    background-repeat: no-repeat;
    padding-left: calc(16px + 18px + 8px);
    font-size: 16px;

    &:first-child {
      background-image: url(${img.IcId});
      border-radius: ${radius} ${radius} 0 0;
    }

    &:nth-child(2) {
      background-image: url(${img.IcPasswd});
      border-radius: 0 0 ${radius} ${radius};
    }

    &::placeholder {
      color: #999999;
      font-size: 16px;
    }

    &:focus {
      outline: none;
      border-color: #45b298;
    }

    &:-webkit-direct-focus {
      border-color: #45b298;
    }
  }

  button {
    width: 100%;
    height: ${space};
    margin-top: 40px;
    background-color: #45b298;
    border-radius: ${radius};
    color: #fff;
    font-size: 16px;
  }
`;
