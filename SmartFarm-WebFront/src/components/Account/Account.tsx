import styled from "styled-components";
import { AccountTypes } from "./containers/AccountContainer";
import { FiX } from "react-icons/fi";

type Props = {
  accounts: AccountTypes[];
  filter: {
    type: string;
    value: string;
  };
  onChangeFilter: (key: "type" | "value", value: string) => void;
  onKeyPressSearch: () => void;
  onClickFilterClear: () => void;
  manage: (username?: string) => void;
  deleteAccount: (username: string) => Promise<void>;
};

const Account = ({
  accounts,
  filter,
  onChangeFilter,
  onKeyPressSearch,
  onClickFilterClear,
  manage,
  deleteAccount,
}: Props) => {
  const headers = [
    "관리자명",
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
        <Search>
          <select onChange={(e) => onChangeFilter("type", e.target.value)}>
            <option value="name">관리자명</option>
            <option value="siteName">농가명</option>
            <option value="siteLocation">지역</option>
            <option value="siteCrop">작물</option>
          </select>
          <input
            value={filter.value}
            onChange={(e) => onChangeFilter("value", e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                onKeyPressSearch();
              }
            }}
            placeholder="검색어 입력 후 Enter 키를 눌러주세요"
          />
          {filter.value && (
            <button onClick={onClickFilterClear}>
              <FiX />
            </button>
          )}
        </Search>
        <button onClick={() => manage()} className="insert">
          + 농가등록
        </button>
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
              <td>{account.name}</td>
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

    .insert {
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

  @media ${({ theme }) => theme.media.mobile} {
    padding: 0 20px;
    overflow-x: scroll;

    header {
      height: 100%;
      flex-direction: column;
      align-items: flex-start;
      margin: 16px 0;

      .insert {
        align-self: flex-end;
      }
    }
  }
`;

export const Search = styled.div`
  width: 400px;
  height: 40px;
  ${({ theme }) => theme.flex.row}
  position: relative;
  color: ${({ theme }) => theme.colors.gray3};

  select {
    width: 120px;
    height: 100%;
    padding: 0 15px;
    border: 1px solid ${({ theme }) => theme.colors.gray2};
    border-right: 0;
    border-radius: 6px 0 0 6px;
    font-size: 16px;

    // 화살표 숨기기
    appearance: none;
    -webkit-appearance: none; // 크롬
    -moz-appearance: none; // 파이어폭스
  }

  input {
    flex: 1;
    height: 100%;
    padding-left: 15px;
    border: 1px solid ${({ theme }) => theme.colors.gray2};
    border-radius: 0 6px 6px 0;
    font-size: 16px;

    &::placeholder {
      color: ${({ theme }) => theme.colors.gray3};
    }
  }

  button {
    width: 40px;
    ${({ theme }) => theme.flex.row}
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 50%;
    right: 0;
    transform: translate(0, -50%);
    background: none;
    border: none;
    font-size: 16px;
  }

  @media ${({ theme }) => theme.media.mobile} {
    input {
      width: 100%;
      margin-bottom: 32px;
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

  @media ${({ theme }) => theme.media.mobile} {
    width: 1000px;
  }
`;
