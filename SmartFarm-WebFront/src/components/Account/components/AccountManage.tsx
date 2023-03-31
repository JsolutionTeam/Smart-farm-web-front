import styled from "styled-components";
import { AccountManageTypes } from "../containers/AccountManageContainer";

type Props = {
  inputs: AccountManageTypes;
  onChangeInputs: (e: { target: HTMLInputElement }) => void;
};

const AccountManage = ({ inputs, onChangeInputs }: Props) => {
  return (
    <Container>
      <header>농가 상세보기</header>
      <TableContainer>
        <Table>
          <tbody>
            <tr>
              <th>관리자명*</th>
              <td>
                <input
                  name=""
                  value={inputs.username}
                  onChange={onChangeInputs}
                />
              </td>
            </tr>
            <tr>
              <th>아이디*</th>
              <td>
                <input
                  name=""
                  value={inputs.username}
                  onChange={onChangeInputs}
                />
              </td>
            </tr>
            <tr>
              <th>비밀번호*</th>
              <td>
                <input
                  name=""
                  value={inputs.username}
                  onChange={onChangeInputs}
                />
              </td>
            </tr>
            <tr>
              <th>농가번호*</th>
              <td>
                <input
                  name=""
                  value={inputs.username}
                  onChange={onChangeInputs}
                />
              </td>
            </tr>
            <tr>
              <th>농가명*</th>
              <td>
                <input
                  name=""
                  value={inputs.username}
                  onChange={onChangeInputs}
                />
              </td>
            </tr>
          </tbody>
        </Table>
        <Table>
          <tbody>
            <tr>
              <th>지역*</th>
              <td>
                <input
                  name=""
                  value={inputs.username}
                  onChange={onChangeInputs}
                />
              </td>
              <th>작물*</th>
              <td>
                <input
                  name=""
                  value={inputs.username}
                  onChange={onChangeInputs}
                />
              </td>
            </tr>
            <tr>
              <th>농가주소</th>
              <td>
                <input
                  name=""
                  value={inputs.username}
                  onChange={onChangeInputs}
                />
              </td>
            </tr>
            <tr>
              <th>전화번호</th>
              <td>
                <input
                  name=""
                  value={inputs.username}
                  onChange={onChangeInputs}
                />
              </td>
            </tr>
            <tr>
              <th>이메일</th>
              <td>
                <input
                  name=""
                  value={inputs.username}
                  onChange={onChangeInputs}
                />
              </td>
            </tr>
          </tbody>
        </Table>
      </TableContainer>
      <Buttons>
        <button>취소</button>
        <button className="active">등록</button>
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
  ${({ theme }) => theme.flex.row}
  align-items: flex-start;
  margin-bottom: 225px;
`;

export const Table = styled.table`
  width: 50%;
  table-layout: fixed;

  tr {
    line-height: 62px;
    border: 1px solid ${({ theme }) => theme.colors.gray2};
    color: ${({ theme }) => theme.colors.gray4};
    font-size: 20px;
    text-align: left;

    th {
      width: 160px;
      padding-left: 20px;
      background-color: ${({ theme }) => theme.colors.primaryBackground};
      font-weight: 500;
    }

    td {
      padding: 0 20px;

      input {
        width: 100%;
        border: none;
        outline: none;
      }
    }
  }

  &:last-child {
    tr {
      border-left: none;
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
