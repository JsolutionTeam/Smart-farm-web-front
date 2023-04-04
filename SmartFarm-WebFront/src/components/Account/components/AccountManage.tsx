import styled from "styled-components";
import { AccountManageTypes } from "../containers/AccountManageContainer";

type Props = {
  type: "등록하기" | "상세보기";
  inputs: AccountManageTypes;
  onChangeInputs: (e: { target: HTMLInputElement }) => void;
  validationUsername: () => Promise<void>;
  onClickRole: (selected: "ADMIN" | "USER") => void;
  msgs: { [input in "username"]: string };
  insert: () => Promise<void>;
  update: () => Promise<void>;
};

const AccountManage = ({
  type,
  inputs,
  onChangeInputs,
  validationUsername,
  onClickRole,
  msgs,
  insert,
  update,
}: Props) => {
  return (
    <Container>
      <header>농가 {type}</header>
      <TableContainer>
        <Tr>
          <p>관리자명*</p>
          <Td>
            <input
              name="name"
              value={inputs.name}
              onChange={onChangeInputs}
              placeholder="관리자명"
            />
          </Td>
        </Tr>
        <Tr>
          <p>지역*</p>
          <Td>
            <input
              name="siteLocation"
              value={inputs.siteLocation}
              onChange={onChangeInputs}
              placeholder="지역"
            />
          </Td>
          <p>작물*</p>
          <Td>
            <input
              name="siteCrop"
              value={inputs.siteCrop}
              onChange={onChangeInputs}
              placeholder="작물"
            />
          </Td>
        </Tr>
        <Tr>
          <p>아이디*</p>
          <Td>
            <input
              name="username"
              value={inputs.username}
              onChange={onChangeInputs}
              onBlur={validationUsername}
              disabled={type === "상세보기"}
              placeholder="아이디"
            />
          </Td>
          {msgs.username && <span>{msgs.username}</span>}
        </Tr>
        <Tr>
          <p>비밀번호*</p>
          <Td>
            <input
              type="password"
              name="password"
              value={inputs.password}
              onChange={onChangeInputs}
              placeholder="비밀번호"
            />
          </Td>
        </Tr>
        <Tr>
          <p>농가구분*</p>
          <Td>
            <button onClick={() => onClickRole("ADMIN")}>관리자</button>
            <button onClick={() => onClickRole("USER")}>사용자</button>
          </Td>
        </Tr>
        <Tr>
          <p>농가명*</p>
          <Td>
            <input
              name="siteName"
              value={inputs.siteName}
              onChange={onChangeInputs}
              placeholder="농가명"
            />
          </Td>
        </Tr>
        <Tr>
          <p>농가주소</p>
          <Td>
            <input
              name="address"
              value={inputs.address}
              onChange={onChangeInputs}
              placeholder="농가주소"
            />
          </Td>
        </Tr>
        <Tr>
          <p>전화번호</p>
          <Td>
            <input
              name="phone"
              value={inputs.phone}
              onChange={onChangeInputs}
              placeholder="전화번호"
            />
          </Td>
        </Tr>
        <Tr>
          <p>이메일</p>
          <Td>
            <input
              name="email"
              value={inputs.email}
              onChange={onChangeInputs}
              placeholder="이메일"
            />
          </Td>
        </Tr>
      </TableContainer>
      <Buttons>
        <button>취소</button>
        <button
          onClick={type === "등록하기" ? insert : update}
          className="active"
        >
          {type === "등록하기" ? "등록" : "수정"}
        </button>
      </Buttons>
    </Container>
  );
};

export default AccountManage;

export const Container = styled.main`
  margin-bottom: 120px;
  padding: 72px 100px 0;
  background-color: #fff;

  header {
    margin-bottom: 24px;
    font-size: 24px;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.gray4};
  }
`;

export const TableContainer = styled.section`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin-bottom: 225px;
`;

export const Tr = styled.article`
  width: 100%;
  height: 62px;
  ${({ theme }) => theme.flex.row}
  align-items: center;
  color: ${({ theme }) => theme.colors.gray4};
  font-size: 20px;
  text-align: left;

  p {
    width: 160px;
    line-height: 62px;
    padding-left: 20px;
    background-color: ${({ theme }) => theme.colors.primaryBackground};
    box-shadow: 0 0 0 1px ${({ theme }) => theme.colors.gray2};
    font-weight: 500;

    &:nth-of-type(-n + 2) {
    }
  }
`;

export const Td = styled.div`
  flex: 1;
  height: 100%;
  ${({ theme }) => theme.flex.col}
  box-shadow: 0 0 0 1px ${({ theme }) => theme.colors.gray2};

  input {
    width: 100%;
    height: 100%;
    padding: 0 20px;
    border: none;
    outline: none;
    color: ${({ theme }) => theme.colors.gray4};

    font-size: 20px;

    &::placeholder {
      color: ${({ theme }) => theme.colors.gray3};
    }
  }
`;

export const Buttons = styled.section`
  ${({ theme }) => theme.flex.row}
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  padding: 20px 0;
  gap: 8px;

  button {
    width: 167px;
    height: 62px;
    background-color: #fff;
    border: 1px solid ${({ theme }) => theme.colors.primary};
    border-radius: 6px;
    color: ${({ theme }) => theme.colors.primary};
    font-size: 20px;
    font-weight: 500;
  }

  .active {
    background-color: ${({ theme }) => theme.colors.primary};
    color: #fff;
  }
`;
