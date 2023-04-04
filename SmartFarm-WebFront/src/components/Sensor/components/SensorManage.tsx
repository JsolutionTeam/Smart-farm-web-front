import {
  Container,
  Buttons,
  TableContainer,
  Tr,
  Td,
} from "@components/Account/components/AccountManage";
import { SensorManageTypes } from "../containers/SensorManageContainer";

type Props = {
  inputs: SensorManageTypes;
  onChangeInputs: (e: { target: HTMLInputElement }) => void;
};

const SensorManage = ({ inputs, onChangeInputs }: Props) => {
  return (
    <Container>
      <header>센서 {inputs.sensorDeviceId ? "상세보기" : "등록하기"}</header>
      <TableContainer>
        <Tr>
          <p>센서타입*</p>
          <Td>
            <input
              name="type"
              value={inputs.type}
              onChange={onChangeInputs}
              placeholder="센서타입을 선택해 주세요"
            />
          </Td>
        </Tr>
        <Tr>
          <p>모델명*</p>
          <Td>
            <input
              name="modelName"
              value={inputs.modelName}
              onChange={onChangeInputs}
              placeholder="모델명을 입력해 주세요"
            />
          </Td>
        </Tr>
        <Tr>
          <p>시리얼넘버*</p>
          <Td>
            <input
              name="serialNumber"
              value={inputs.serialNumber}
              onChange={onChangeInputs}
              placeholder="시리얼넘버를 입력해 주세요"
            />
          </Td>
        </Tr>
        <Tr>
          <p>농가계정</p>
          <Td>
            <input
              name="siteSeq"
              value={inputs.siteSeq ? inputs.siteSeq : "-"}
              onChange={onChangeInputs}
            />
          </Td>
        </Tr>
        <Tr>
          <p>센서이미지</p>
          <Td>
            <input type="file" />
          </Td>
        </Tr>
      </TableContainer>
      <Buttons>
        <button>취소</button>
        <button className="active">등록</button>
      </Buttons>
    </Container>
  );
};

export default SensorManage;
