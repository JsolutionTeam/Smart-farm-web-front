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
        환경 데이터 <span>모니터링</span>
      </header>
      <Inputs>
        <header>로그인</header>
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
    </Container>
  );
};

export default Login;

const radius = "8px";

const Container = styled.main`
  width: 100vw;
  height: 100vh;
  ${({ theme }) => theme.flex.col}
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.gray1};

  & > header {
    margin-bottom: 62px;
    font-size: 28px;
    font-weight: bold;
    color: ${({ theme }) => theme.colors.gray4};

    span {
      color: ${({ theme }) => theme.colors.primary};
    }
  }
`;

const Inputs = styled.section`
  width: 536px;
  ${({ theme }) => theme.flex.col};
  padding: 40px;
  background-color: #fff;
  border-radius: 24px;
  box-shadow: 0 3px 10px 0 rgba(0, 0, 0, 0.08);

  header {
    margin-bottom: 32px;
    font-size: 24px;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.gray4};
  }

  input {
    height: 60px;
    padding-left: 46px;
    border: 1px solid ${({ theme }) => theme.colors.gray2};
    background-position: 20px center;
    background-repeat: no-repeat;
    font-size: 16px;

    &:first-of-type {
      background-image: url(${img.IcId});
      border-radius: ${radius} ${radius} 0 0;
    }

    &:last-of-type {
      margin-bottom: 40px;
      background-image: url(${img.IcPasswd});
      border-radius: 0 0 ${radius} ${radius};
    }

    &::placeholder {
      font-size: 16px;
      color: ${({ theme }) => theme.colors.gray3};
    }

    &:focus {
      border-color: ${({ theme }) => theme.colors.primary};
      outline: none;
    }

    &:-webkit-direct-focus {
      border-color: ${({ theme }) => theme.colors.primary};
    }
  }

  button {
    height: 60px;
    font-size: 20px;
    background-color: ${({ theme }) => theme.colors.primary};
    border: 1px solid ${({ theme }) => theme.colors.primary};
    border-radius: 6px;
    color: #fff;
  }

  @media ${({ theme }) => theme.media.mobile} {
    width: calc(100vw - 48px);
  }
`;
