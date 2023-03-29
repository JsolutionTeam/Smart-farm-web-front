import styled from "styled-components";
import { SiteTypes } from "@typedef/components/Site/site.types";
import { AccountTypes } from "@typedef/components/Site/account.types";

type Props = {
  sites: SiteTypes[];
  accounts: AccountTypes[];
  toggle: {
    sites: boolean;
    accounts: boolean;
  };
  manageSite: (site: SiteTypes | null) => void;
  manageAccount: (account: AccountTypes | null) => void;
  remove: (kind: "site" | "account", id: number | string) => Promise<void>;
  onChangeToggle: (kind: "sites" | "accounts") => void;
};

const Site = ({
  sites,
  accounts,
  manageSite,
  manageAccount,
  remove,
  toggle,
  onChangeToggle,
}: Props) => {
  return (
    <Container>
      <header>
        <button onClick={() => onChangeToggle("sites")} className="toggle">
          <Arrow visible={toggle.sites} />
          전체 농가&nbsp;({sites.length})
        </button>
        <button onClick={() => manageSite(null)} className="insert">
          농가 생성
        </button>
      </header>
      {toggle.sites && (
        <TableWrapper>
          <Table>
            <thead>
              <tr>
                <th>농가번호</th>
                <th>농가</th>
                <th>수정</th>
                <th>삭제</th>
              </tr>
            </thead>
            <tbody>
              {sites.map((site) => (
                <tr key={site.id}>
                  <td>{site.id}</td>
                  <td>{site.name}</td>
                  <td>
                    <button
                      onClick={() => manageSite(site)}
                      className="update"
                    />
                  </td>
                  <td>
                    <button
                      onClick={() => remove("site", site.id)}
                      className="delete"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </TableWrapper>
      )}
      <header>
        <button onClick={() => onChangeToggle("accounts")} className="toggle">
          <Arrow visible={toggle.sites} />
          전체 계정&nbsp;({accounts.length})
        </button>
        <button onClick={() => manageAccount(null)} className="insert">
          계정 생성
        </button>
      </header>
      {toggle.accounts && (
        <TableWrapper>
          <Table>
            <thead>
              <tr>
                <th>번호</th>
                <th>아이디</th>
                <th>농가</th>
                <th>수정</th>
                <th>삭제</th>
              </tr>
            </thead>
            <tbody>
              {accounts.map((row, idx) => (
                <tr key={row.username}>
                  <td>{idx + 1}</td>
                  <td>{row.username}</td>
                  <td>{row.site.name}</td>
                  <td>
                    <button
                      onClick={() => manageAccount(row)}
                      className="update"
                    />
                  </td>
                  <td>
                    <button
                      onClick={() => remove("account", row.username)}
                      className="delete"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </TableWrapper>
      )}
    </Container>
  );
};

export default Site;

const Container = styled.main`
  width: 650px;
  ${({ theme }) => theme.flex.col}
  margin: 40px auto;
  margin-bottom: 60px;

  header {
    ${({ theme }) => theme.flex.row}
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;

    .toggle {
      ${({ theme }) => theme.flex.row}
      align-items: center;
      font-size: 1.25rem;
      font-weight: 600;
      cursor: pointer;
    }
  }

  .insert {
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

    .insert {
      width: 130px;
    }
  }
`;

// 모바일 가로 스크롤 위해 한번 감싸줌
const TableWrapper = styled.section`
  @media ${({ theme }) => theme.media.mobile} {
    width: 100%;
    overflow-x: scroll;
  }
`;

const Table = styled.table`
  width: 100%;
  margin-bottom: 40px;
  background-color: #fff;
  border: 1px solid #d8d8d8;
  border-radius: 8px;

  thead {
    line-height: 40px;
    background-color: rgba(118, 118, 118, 0.05);
  }

  tbody {
    tr {
      line-height: 40px;
      text-align: center;
    }

    td {
      position: relative;
    }

    input {
      width: 70%;
      height: 30px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      border: 1px solid #ddd;
      border-radius: 5px;
      font-size: 16px;
      text-align: center;
    }

    button {
      width: 24px;
      height: 24px;
      display: block;
      margin: auto;
      cursor: pointer;
    }

    .check {
      background: url(/assets/images/ic-check.svg) no-repeat;
      background-size: 16px;
      background-position: center;
    }

    .update {
      background: url(/assets/images/ic-edit.svg) no-repeat;
      background-size: 16px;
      background-position: center;
    }

    .delete {
      background: url(/assets/images/ic-trash.svg) no-repeat;
      background-size: 16px;
      background-position: center;
    }
  }

  @media ${({ theme }) => theme.media.mobile} {
    width: 500px;
    /* table-layout: fixed; */

    td {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
`;

const Arrow = styled.span<{ visible: boolean }>`
  width: 1.25rem;
  height: 1.25rem;
  margin-right: 10px;
  background: url(/assets/images/ic-chevron-right.svg) no-repeat;
  background-size: 1.25rem;
  display: block;
  transform: ${({ visible }) => visible && "rotate(90deg)"};
`;
