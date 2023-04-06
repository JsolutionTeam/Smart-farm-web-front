import { Container, Search, Table } from "@components/Account/Account";
import { SensorTypes } from "./containers/SensorContainer";
import { FiX } from "react-icons/fi";

type Props = {
  sensors: SensorTypes[];
  filter: {
    type: string;
    value: string;
  };
  onChangeFilter: (key: "type" | "value", value: string) => void;
  onKeyPressSearch: () => void;
  onClickFilterClear: () => void;
  manage: (id?: number) => void;
  deleteSensor: (id: number) => Promise<void>;
};

const Sensor = ({
  sensors,
  filter,
  onChangeFilter,
  onKeyPressSearch,
  onClickFilterClear,
  manage,
  deleteSensor,
}: Props) => {
  const headers = [
    "센서타입",
    "모델명",
    "시리얼넘버",
    "사용 농가계정",
    "수정",
    "삭제",
  ];

  return (
    <Container>
      <header>
        <Search>
          <select onChange={(e) => onChangeFilter("type", e.target.value)}>
            <option value="type">센서타입</option>
            <option value="modelName">모델명</option>
            <option value="serialNumber">시리얼넘버</option>
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
          + 센서등록
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
          {sensors.map((sensor) => (
            <tr key={sensor.sensorDeviceId}>
              <td>{sensor.type}</td>
              <td>{sensor.modelName}</td>
              <td>{sensor.serialNumber}</td>
              <td>{sensor.siteName}</td>
              <td>
                <button
                  onClick={() => manage(sensor.sensorDeviceId)}
                  className="edit"
                />
              </td>
              <td>
                <button
                  onClick={() => deleteSensor(sensor.sensorDeviceId)}
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

export default Sensor;
