import styled from "styled-components";
import { AccountManageTypes } from "../containers/AccountManageContainer";
import { useNavigate } from "react-router-dom";

type Props = {
  type: "등록하기" | "상세보기";
  inputs: AccountManageTypes;
  onChangeInputs: (e: { target: HTMLInputElement }) => void;
  validationUsername: () => Promise<void>;
  onClickClearUsername: () => void;
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
  onClickClearUsername,
  onClickRole,
  msgs,
  insert,
  update,
}: Props) => {
  const navigate = useNavigate();

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
              placeholder="ex) 홍길동"
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
          {msgs.username && (
            <Message>
              <p>{msgs.username}</p>
              <button onClick={onClickClearUsername} />
            </Message>
          )}
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
            <div className="radios">
              <label className={inputs.role === "ROLE_ADMIN" ? "active" : ""}>
                <input
                  type="radio"
                  name="role"
                  checked={inputs.role === "ROLE_ADMIN"}
                  onChange={() => onClickRole("ADMIN")}
                />
                관리자
              </label>
              <label className={inputs.role === "ROLE_USER" ? "active" : ""}>
                <input
                  type="radio"
                  name="role"
                  checked={inputs.role === "ROLE_USER"}
                  onChange={() => onClickRole("USER")}
                />
                사용자
              </label>
            </div>
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
        <div className="two">
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
          </Tr>
          <Tr>
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
        </div>
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
              type="tel"
              name="phone"
              value={inputs.phone}
              onChange={onChangeInputs}
              maxLength={12}
              placeholder="숫자만 입력해 주세요"
            />
          </Td>
        </Tr>
        <Tr>
          <p>이메일</p>
          <Td>
            <input
              type="email"
              name="email"
              value={inputs.email}
              onChange={onChangeInputs}
              placeholder="ex) honggildong@abc.com"
            />
          </Td>
        </Tr>
        <Tr>
          <p>전송 주기*</p>
          <Td>
            <input
              name="siteDelay"
              // type="number"
              min="60"
              value={inputs.siteDelay}
              onChange={onChangeInputs}
              placeholder="전송주기를 입력해주세요. (단위: 초, 최소: 60)"
            />
          </Td>
        </Tr>
        <Tr>
          <p>apiKey</p>
          <Td>
            <input
              name="siteApiKey"
              value={inputs.siteApiKey}
              onChange={onChangeInputs}
              placeholder="제공 받은 apiKey를 입력해 주세요"
            />
          </Td>
        </Tr>
      </TableContainer>
      <Buttons>
        <button
          onClick={()=>navigate('/account')}>취소</button>
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
  margin-bottom: 150px;
  padding: 72px 100px 0;
  background-color: #fff;

  header {
    margin-bottom: 24px;
    font-size: 24px;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.gray4};
  }

  @media ${({ theme }) => theme.media.mobile} {
    padding: 72px 20px 0;
  }
`;

export const TableContainer = styled.section`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin-bottom: 225px;

  .two {
    ${({ theme }) => theme.flex.row}
  }

  @media ${({ theme }) => theme.media.mobile} {
    ${({ theme }) => theme.flex.col}

    .two {
      flex-direction: column;
    }
  }
`;

export const Tr = styled.article`
  width: 100%;
  min-height: 62px;
  height: 100%;
  ${({ theme }) => theme.flex.row}
  align-items: center;
  color: ${({ theme }) => theme.colors.gray4};
  font-size: 20px;
  text-align: left;

  & > p {
    width: 160px;
    height: 100%;
    ${({ theme }) => theme.flex.row}
    align-items: center;
    padding-left: 20px;
    background-color: ${({ theme }) => theme.colors.primaryBackground};
    box-shadow: 0 0 0 1px ${({ theme }) => theme.colors.gray2};
    font-weight: 500;
  }

  @media ${({ theme }) => theme.media.mobile} {
    height: 88px;
  }
`;

export const Td = styled.div`
  flex: 1;
  height: 100%;
  ${({ theme }) => theme.flex.col}
  justify-content: center;
  padding: 0 20px;
  box-shadow: 0 0 0 1px ${({ theme }) => theme.colors.gray2};

  input:not(input[type="radio"]) {
    width: 100%;
    border: none;
    outline: none;
    color: ${({ theme }) => theme.colors.gray4};
    font-size: 20px;

    &::placeholder {
      color: ${({ theme }) => theme.colors.gray3};
    }

    &:disabled {
      background-color: ${({ theme }) => theme.colors.gray2};
      color: ${({ theme }) => theme.colors.gray3};
    }
  }

  .radios {
    width: 100%;
    height: 100%;
    ${({ theme }) => theme.flex.row}
    align-items: center;
    border: none;

    label {
      ${({ theme }) => theme.flex.row}
      align-items: center;
      color: ${({ theme }) => theme.colors.gray3};
      font-size: 20px;

      &:first-child {
        margin-right: 36px;
      }
    }

    input[type="radio"] {
      -webkit-appearance: none;
      -moz-appearance: none;
      width: 24px;
      height: 24px;
      margin: 0;
      margin-right: 8px;
      background-color: #fff;
      border: 1px solid ${({ theme }) => theme.colors.gray2};
      border-radius: 50%;

      &:after {
        content: "";
        width: 16px;
        height: 16px;
        display: inline-block;
        position: relative;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: ${({ theme }) => theme.colors.gray2};
        border-radius: 50%;
      }
    }

    // radio checked
    .active {
      color: ${({ theme }) => theme.colors.primary};

      input {
        border-color: ${({ theme }) => theme.colors.primary};

        &:after {
          background-color: ${({ theme }) => theme.colors.primary};
        }
      }
    }
  }

  @media ${({ theme }) => theme.media.mobile} {
    label:first-child {
      margin-right: 18px !important;
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

const Message = styled.div`
  ${({ theme }) => theme.flex.row}
  align-items: center;
  position: absolute;
  top: 40px;
  left: 50%;
  transform: translate(-50%, 0);
  background-color: #f8e1e1;
  border: 1px solid ${({ theme }) => theme.colors.error};
  border-radius: 4px;
  color: ${({ theme }) => theme.colors.error};
  z-index: 99;

  &:before {
    content: "";
    width: 62px;
    height: 62px;
    display: block;
    background: url(/assets/icons/error.svg) no-repeat;
    background-position: center;
  }

  p {
    width: 290px;
    margin-right: 12px;
  }

  button {
    width: 28px;
    height: 28px;
    margin-right: 8px;
    background: url(/assets/icons/x.svg) no-repeat;
    background-position: center;
    border: none;
  }
`;
