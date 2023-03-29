import * as S from "@styles/components/ManageStyle";
import { SiteTypes } from "@typedef/components/Site/site.types";

type Props = {
  type: "생성" | "수정";
  inputs: SiteTypes;
  msgs: { [input in "id"]: string };
  onChangeInputs: (e: { target: HTMLInputElement }) => void;
  onChangeId: (id: number) => Promise<void>;
  save: () => Promise<void>;
};

const SiteManage = ({
  type,
  inputs,
  msgs,
  onChangeInputs,
  onChangeId,
  save,
}: Props) => {
  return (
    <S.Container>
      <header>
        <h3>농가 {type}</h3>
        <button onClick={save} className="save">
          {type}
        </button>
      </header>
      <S.Inputs>
        <S.InputWrapper>
          <p>농가번호</p>
          <input
            name="id"
            defaultValue={inputs.id || ""}
            onBlur={(e) => onChangeId(+e.target.value)}
            disabled={type === "수정"}
            placeholder="농가번호"
          />
        </S.InputWrapper>
        {msgs.id && <p className="msg">{msgs.id}</p>}
        <S.InputWrapper>
          <p>농가명</p>
          <input
            name="name"
            defaultValue={inputs.name}
            onBlur={onChangeInputs}
            placeholder="농가명"
          />
        </S.InputWrapper>
      </S.Inputs>
    </S.Container>
  );
};

export default SiteManage;
