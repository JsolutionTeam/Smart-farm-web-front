import styled from "styled-components";
import { AccountTypes } from "./containers/AccountContainer";

type Props = {
  accounts: AccountTypes[];
  manage: (username?: string) => void;
  deleteAccount: (username: string) => Promise<void>;
};

const Account = ({ accounts, manage, deleteAccount }: Props) => {
  const headers = [
    "아이디",
    "농가번호",
    "농가명",
    "지역",
    "작물",
    "수정",
    "삭제",
  ];

  return (
    <Container>
      <header>
        <input placeholder="검색어를 입력하세요" />
        <button onClick={() => manage()}>+ 농가등록</button>
      </header>
      <Table>
        <thead>
          <tr>
            {headers.map((th) => (
              <th key={th}>{th}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {accounts.map((account) => (
            <tr key={account.username}>
              <td>{account.username}</td>
              <td>{account.site.id}</td>
              <td>{account.site.name}</td>
              <td>{account.site.location}</td>
              <td>{account.site.crop}</td>
              <td>
                <button
                  onClick={() => manage(account.username)}
                  className="edit"
                />
              </td>
              <td>
                <button
                  onClick={() => deleteAccount(account.username)}
                  className="delete"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default Account;

export const Container = styled.main`
  margin-bottom: 120px;
  padding: 0 60px;
  background-color: #fff;

  header {
    height: 72px;
    ${({ theme }) => theme.flex.row}
    align-items: center;
    justify-content: space-between;

    input {
      width: 400px;
      height: 40px;
      padding-left: 15px;
      border: 1px solid ${({ theme }) => theme.colors.gray2};
      border-radius: 6px;

      &::placeholder {
        color: ${({ theme }) => theme.colors.gray3};
        font-size: 16px;
      }
    }

    button {
      width: 113px;
      height: 40px;
      background-color: ${({ theme }) => theme.colors.primary};
      border: none;
      border-radius: 6px;
      color: #fff;
      font-size: 16px;
      font-weight: 500;
      text-align: center;
    }
  }
`;

export const Table = styled.table`
  width: 100%;
  table-layout: fixed;

  thead {
    line-height: 72px;
    border-bottom: 1px solid ${({ theme }) => theme.colors.gray2};
    color: ${({ theme }) => theme.colors.gray3};
    font-size: 20px;
    font-weight: 500s;
    text-align: left;

    th {
      &:nth-last-child(-n + 2) {
        width: 100px;
        text-align: center;
      }
    }
  }

  tbody {
    tr {
      height: 72px;
      border-bottom: 1px solid ${({ theme }) => theme.colors.gray2};
      font-size: 20px;

      td {
        vertical-align: middle;
      }

      td:nth-last-child(-n + 2) {
        vertical-align: middle;

        button {
          width: 40px;
          height: 40px;
          display: block;
          margin: auto;
          background-color: ${({ theme }) => theme.colors.primaryBackground};
          border: none;
          border-radius: 6px;
          background-repeat: no-repeat;
          background-position: center;
        }

        .edit {
          background-image: url(/assets/icons/edit.svg);
        }

        .delete {
          background-image: url(/assets/icons/delete.svg);
        }
      }

      &:last-child {
        border-bottom: none;
      }
    }
  }
`;
