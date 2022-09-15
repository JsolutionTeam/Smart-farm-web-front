import styled from 'styled-components';
import img from '@assets/image';

const Login = () => {
  return (
    <Main>
      <header>로그인</header>
      <Inputs>
        <input autoFocus placeholder='아이디' />
        <input placeholder='비밀번호' />
        <button type='button'>로그인</button>
      </Inputs>
    </Main>
  );
};

export default Login;

const radius = '8px';
const space = '60px';

export const Main = styled.main`
  width: 508px;
  ${({ theme }) => theme.flex.col}
  align-items: center;
  transform: translate(0, -90px); // 헤더 포함 수직 정렬
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
      background-image: url(${img.IconId});
      border-radius: ${radius} ${radius} 0 0;
    }

    &:nth-child(2) {
      background-image: url(${img.IconPasswd});
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
