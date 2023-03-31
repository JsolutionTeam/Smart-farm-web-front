import {
  Container,
  TableContainer,
  Table,
  Buttons,
} from "@components/Account/components/AccountManage";

const SensorManage = () => {
  return (
    <Container>
      <header>센서 상세보기</header>
      <TableContainer>
        <Table>
          <tbody>
            <tr>
              <th>센서명*</th>
              <td></td>
            </tr>
            <tr>
              <th>시리얼넘버*</th>
              <td></td>
            </tr>
            <tr>
              <th>센서이미지</th>
              <td></td>
            </tr>
          </tbody>
        </Table>
        <Table>
          <tbody>
            <tr>
              <th>모델명*</th>
              <td></td>
            </tr>
            <tr>
              <th>농가계정</th>
              <td></td>
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

export default SensorManage;
