import styled from 'styled-components';
import img from '@assets/image';

type Props = {
  onChangeInputs: (e: { target: HTMLInputElement }) => void;
  onClickLogin: () => Promise<void>;
};

const Login = ({ onChangeInputs, onClickLogin }: Props) => {
  return (
    <Main>
      <LoginBox>
        <header>로그인</header>
        <Inputs>
          <input
            name='id'
            onChange={onChangeInputs}
            autoFocus
            placeholder='아이디'
          />
          <input
            name='passwd'
            onChange={onChangeInputs}
            placeholder='비밀번호'
          />
          <button type='button' onClick={onClickLogin}>
            로그인
          </button>
        </Inputs>
      </LoginBox>
    </Main>
  );
};

export default Login;

const radius = '8px';
const space = '60px';

export const Main = styled.main`
  width: 100%;
  height: 100%;
  ${({ theme }) => theme.flex.col}
  align-items: center;
  justify-content: center;

  @media ${({ theme }) => theme.media.mobile} {
    padding: 0 40px;
  }
`;

export const LoginBox = styled.main`
  width: 508px;
  ${({ theme }) => theme.flex.col}
  align-items: center;
  background-color: #fff;
  border: 1px solid #d8d8d8;
  border-radius: ${radius};

  header {
    height: ${space};
    line-height: ${space};
    font-size: 18px;
    font-weight: 600;
  }

  @media ${({ theme }) => theme.media.mobile} {
    width: 100%;
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
      outline: auto;
      outline-color: #45b298;
    }
  }

  button {
    width: 100%;
    height: ${space};
    margin-top: 40px;
    background-color: #45b298;
    color: #fff;
    border-radius: ${radius};
  }
`;
