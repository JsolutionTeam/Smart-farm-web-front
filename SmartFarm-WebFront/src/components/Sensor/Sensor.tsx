import { Container, Table } from "@components/Account/Account";
import { SensorTypes } from "./containers/SensorContainer";

type Props = {
  sensors: SensorTypes[];
  manage: (id?: number) => void;
};

const Sensor = ({ sensors, manage }: Props) => {
  const headers = [
    "센서명",
    "모델명",
    "시리얼넘버",
    "사용 농가계정",
    "수정",
    "삭제",
  ];

  return (
    <Container>
      <header>
        <input placeholder="검색어를 입력하세요" />
        <button onClick={() => manage()}>+ 센서등록</button>
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
          {sensors.map((sensor) => (
            <tr></tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default Sensor;
