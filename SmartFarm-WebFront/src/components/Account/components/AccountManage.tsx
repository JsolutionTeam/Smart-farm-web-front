import styled from "styled-components";
import { AccountTypes } from "@typedef/components/Account/account.types";

type Props = {
  type: "생성" | "수정";
  inputs: AccountTypes;
  msgs: { [input in "username" | "passwd" | "confirmPasswd"]: string };
  onChangeUsername: (id: string) => Promise<void>;
  onChangePasswd: (passwd: string) => void;
  onChangeConfirmPasswd: (passwd: string) => void;
  onChangeInputs: (input: "role" | "site.id", value: string) => void;
  save: () => Promise<void>;
};

const AccountManage = ({
  type,
  inputs,
  msgs,
  onChangeInputs,
  onChangeUsername,
  onChangePasswd,
  onChangeConfirmPasswd,
  save,
}: Props) => {
  return (
    <Container>
      <header>
        <h3>계정 {type}</h3>
        <button onClick={save} className="save">
          저장
        </button>
      </header>
      <Inputs>
        <InputWrapper>
          <p>권한</p>
          <div className="btns">
            <InputBtn
              onClick={() => onChangeInputs("role", "ROLE_ADMIN")}
              active={inputs.role === "ROLE_ADMIN"}
            >
              관리자
            </InputBtn>
            <InputBtn
              onClick={() => onChangeInputs("role", "ROME_USER")}
              active={inputs.role === "ROME_USER"}
            >
              사용자
            </InputBtn>
          </div>
        </InputWrapper>
        <InputWrapper>
          <p>아이디</p>
          <input
            name="username"
            defaultValue={inputs.username}
            onBlur={(e) => onChangeUsername(e.target.value)}
            placeholder="아이디"
          />
        </InputWrapper>
        {msgs.username && <p className="msg">{msgs.username}</p>}
        <InputWrapper>
          <p>비밀번호</p>
          <input
            type="password"
            onBlur={(e) => onChangePasswd(e.target.value)}
            placeholder="4자 이상"
          />
        </InputWrapper>
        {msgs.passwd && <p className="msg">{msgs.passwd}</p>}
        <InputWrapper>
          <p>비밀번호 확인</p>
          <input
            type="password"
            onChange={(e) => onChangeConfirmPasswd(e.target.value)}
            placeholder="비밀번호 확인"
          />
        </InputWrapper>
        {msgs.confirmPasswd && <p className="msg">{msgs.confirmPasswd}</p>}
        <InputWrapper>
          <p>농가번호</p>
          <input
            type="number"
            // defaultValue={inputs.site.name}
            onBlur={(e) => onChangeInputs("site.id", e.target.value)}
            placeholder="농가번호"
          />
        </InputWrapper>
      </Inputs>
    </Container>
  );
};

export default AccountManage;

const Container = styled.main`
  width: 650px;
  ${({ theme }) => theme.flex.col}
  margin: 40px auto;
  margin-bottom: 100px;

  header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
  }

  .save {
    width: 190px;
    height: 45px;
    align-self: flex-end;
    background-color: #e4eeee;
    border: 1px solid #45b298;
    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;
  }

  @media ${({ theme }) => theme.media.mobile} {
    width: calc(100vw - 40px);
  }
`;

const Inputs = styled.section`
  width: 100%;
  padding: 20px;
  background-color: #fff;
  border: 1px solid #d8d8d8;
  border-radius: 8px;

  .msg {
    margin-left: 160px; // InputWrapper > p width
    margin-bottom: 20px;
    font-weight: 600;
    color: #e5435a;
  }

  @media ${({ theme }) => theme.media.mobile} {
    .msg {
      margin-left: 0;
    }
  }
`;

const InputWrapper = styled.article`
  display: flex;
  align-items: center;
  margin-bottom: 20px;

  p {
    width: 160px;
  }

  input {
    flex: 1;
    line-height: 45px;
    padding-left: 20px;
    border: 1px solid #d8d8d8;
    border-radius: 5px;
    font-size: 16px;
  }

  .btns {
    flex: 1;
    display: flex;
    align-items: center;
  }

  &:last-child {
    margin-bottom: 0;
  }

  @media ${({ theme }) => theme.media.mobile} {
    width: 100%;
    flex-direction: column;

    p {
      width: 100%;
      margin-bottom: 20px;
    }
    input,
    .btns {
      width: 100%;
    }

    input {
    }
  }
`;

const InputBtn = styled.button<{ active: boolean }>`
  flex: 1;
  height: 45px;
  background-color: #fff;
  border: 1px solid #d8d8d8;
  border-color: ${({ active }) => active && "#45b298"};
  border-radius: 5px;
  font-size: 16px;
  font-weight: ${({ active }) => active && 600};
  color: ${({ active }) => (active ? "#45b298" : "#aaa")};
  cursor: pointer;

  &:last-child {
    margin-left: 20px;
  }
`;
