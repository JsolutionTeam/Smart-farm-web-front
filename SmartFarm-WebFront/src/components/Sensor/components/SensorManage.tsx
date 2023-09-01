import styled from "styled-components";
import {
  Container,
  Buttons,
  TableContainer,
  Tr,
  Td,
} from "@components/Account/components/AccountManage";
import useOutsideClick from "@hooks/useOutsideClick2";
import { SensorManageTypes } from "../containers/SensorManageContainer";
import { FiChevronDown } from "react-icons/fi";
import { Option, Options } from "@components/Common/Select/SiteSelect";
import { SiteTypes } from "@store/site/actions";

type Props = {
  inputs: SensorManageTypes;
  onChangeInputs: (e: { target: HTMLInputElement }) => void;
  insert: () => Promise<void>;
  update: () => Promise<void>;
  isVisible: { [key in "type" | "site"]: boolean };
  visibleHandler: (key: "type" | "site", visible: boolean) => void;
  typeSelectRef: React.RefObject<HTMLDivElement>;
  siteSelectRef: React.RefObject<HTMLDivElement>;
  onClickType: (type: string) => void;
  onClickSite: (siteName: string, siteSeq: number) => void;
  sites: SiteTypes[];
  onChangeSensorImg: (e: React.ChangeEvent<HTMLInputElement>) => void;
  sensorImg: File | null;
  previewUrl: string;
};

const SensorManage = ({
  inputs,
  onChangeInputs,
  insert,
  update,
  isVisible,
  visibleHandler,
  typeSelectRef,
  siteSelectRef,
  onClickType,
  onClickSite,
  sites,
  onChangeSensorImg,
  sensorImg,
  previewUrl,
}: Props) => {
  useOutsideClick({
    elements: [
      {
        ref: typeSelectRef,
        isVisible: isVisible.type,
        func: () => visibleHandler("type", false),
      },
      {
        ref: siteSelectRef,
        isVisible: isVisible.site,
        func: () => visibleHandler("site", false),
      },
    ],
  });

  const types = [
    "대기 온도",
    "대기 습도",
    "대기 온/습도",
    "풍향",
    "풍속",
    "풍향/풍속",
    "기압",
    "지온",
    "토양 수분",
    "지온/토양 수분",
    "수분함량",
    "일사량",
    "강우량",
    "수위",
    "수온",
    "수위/수온",
    "이산화탄소(co2)",
    "산소(o2)",
    "에틸렌(c2h4)",
    "가스",
    "개폐",
  ];

  return (
    <Container>
      <header>센서 {inputs.sensorDeviceId ? "상세보기" : "등록하기"}</header>
      <TableContainer>
        <Tr>
          <p>센서타입*</p>
          <Td>
            <Select ref={typeSelectRef}>
              <Selected onClick={() => visibleHandler("type", !isVisible.type)}>
                <p className={inputs.type ? "selected" : ""}>
                  {inputs.type || "센서타입을 선택해 주세요"}
                </p>
                <FiChevronDown />
              </Selected>
              <Options isVisible={isVisible.type} className="options">
                {types.map((type) => (
                  <Option
                    key={type}
                    selected={inputs.type === type}
                    onClick={() => onClickType(type)}
                  >
                    {type}
                  </Option>
                ))}
              </Options>
            </Select>
          </Td>
        </Tr>
        <Tr>
          <p>단위</p>
          <Td>
            <input
              name="unit"
              value={inputs.unit}
              onChange={onChangeInputs}
              placeholder="단위를 입력해 주세요"
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
          <p>IP주소</p>
          <Td>
            <input
              name="ip"
              value={inputs.ip}
              onChange={onChangeInputs}
              placeholder="IP주소를 입력해 주세요"
            />
          </Td>
        </Tr>
        <Tr>
          <p>사용 농가계정</p>
          <Td>
            <Select ref={siteSelectRef}>
              <Selected onClick={() => visibleHandler("site", !isVisible.site)}>
                <p className={inputs.siteSeq ? "selected" : ""}>
                  {inputs.siteName || "농가계정을 선택해 주세요"}
                </p>
                <FiChevronDown />
              </Selected>
              <Options isVisible={isVisible.site} className="options">
                <Option
                  onClick={() => onClickSite("", 0)}
                  selected={inputs.siteSeq === 0}
                >
                  농가계정을 선택해 주세요
                </Option>
                {sites.map((site) => (
                  <Option
                    key={site.id}
                    selected={inputs.siteSeq === site.id}
                    onClick={() => onClickSite(site.name, site.id)}
                  >
                    {site.name}
                  </Option>
                ))}
              </Options>
            </Select>
          </Td>
        </Tr>
        <Tr>
          <p>센서이미지</p>
          <Img isSelected={Boolean(inputs.imgPath || previewUrl)}>
            <label htmlFor="input-file">
              <div className="preview">
                {previewUrl ? (
                  <img src={previewUrl} alt="미리보기" />
                ) : inputs.imgPath ? (
                  <img src={`${inputs.imgPath}`} alt="미리보기" />
                ) : (
                  ""
                )}
              </div>
            </label>
            <input
              type="file"
              id="input-file"
              accept="image/*"
              onChange={onChangeSensorImg}
            />
          </Img>
        </Tr>
      </TableContainer>
      <Buttons>
        <button>취소</button>
        <button
          onClick={inputs.sensorDeviceId ? update : insert}
          className="active"
        >
          {inputs.sensorDeviceId ? "수정" : "등록"}
        </button>
      </Buttons>
    </Container>
  );
};

export default SensorManage;

const Select = styled.div`
  width: 100%;
  height: 100%;
  ${({ theme }) => theme.flex.col}
  justify-content: center;
  position: relative;

  .options {
    width: 100% !important;
    top: 62px;
  }
`;

const Selected = styled.button`
  width: 100%;
  ${({ theme }) => theme.flex.row}
  align-items: center;
  justify-content: space-between;
  padding: 0;
  background-color: #fff;
  border: none;
  color: ${({ theme }) => theme.colors.gray3};
  font-size: 20px;

  .selected {
    color: ${({ theme }) => theme.colors.gray4};
  }
`;

const Img = styled(Td)<{ isSelected: boolean }>`
  padding: 20px;

  label {
    width: fit-content;
    cursor: pointer;
  }

  input {
    display: none;
  }

  .preview {
    width: 88px;
    height: 88px;
    background-color: ${({ isSelected, theme }) =>
      isSelected ? "#fff" : theme.colors.gray2};
    background-image: ${({ isSelected }) =>
      isSelected ? "" : "url(/assets/icons/camera.svg)"};
    background-repeat: no-repeat;
    background-position: center;
    border: 1px dotted ${({ theme }) => theme.colors.gray3};
  }

  .preview img {
    width: 100%;
    height: 100%;
  }

  @media ${({ theme }) => theme.media.mobile} {
  }
`;
