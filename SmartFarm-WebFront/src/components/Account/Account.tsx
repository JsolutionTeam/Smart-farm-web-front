import styled from "styled-components";
import { AccountTypes } from "@typedef/components/Account/account.types";

type Props = {
  tableData: AccountTypes[];
  manage: (id?: number) => void;
  remove: (username: string) => Promise<void>;
};

const Account = ({ tableData, manage, remove }: Props) => {
  return (
    <Container>
      <button onClick={() => manage()} className="insert">
        계정 생성
      </button>
      <TableWrapper>
        <Accounts>
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
            {tableData.map((row, idx) => (
              <tr key={row.username}>
                <td>{idx + 1}</td>
                <td>{row.username}</td>
                <td>{row.site.name}</td>
                <td>
                  <button
                    onClick={() => manage(row.site.id)}
                    className="update"
                  />
                </td>
                <td>
                  <button
                    onClick={() => remove(row.username)}
                    className="delete"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </Accounts>
      </TableWrapper>
    </Container>
  );
};

export default Account;

const Container = styled.main`
  width: 650px;
  ${({ theme }) => theme.flex.col}
  margin: 40px auto;
  margin-bottom: 100px;

  .insert {
    width: 190px;
    height: 45px;
    align-self: flex-end;
    margin-bottom: 20px;
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

// 모바일 가로 스크롤 용
const TableWrapper = styled.section`
  @media ${({ theme }) => theme.media.mobile} {
    width: 100%;
    overflow-x: scroll;
  }
`;

const Accounts = styled.table`
  width: 100%;
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

    button {
      width: 24px;
      height: 24px;
      display: block;
      margin: auto;
      cursor: pointer;
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
    width: 650px;
    table-layout: fixed;

    td {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
`;
