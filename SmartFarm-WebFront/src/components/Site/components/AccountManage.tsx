import * as S from "@styles/components/ManageStyle";
import useOnClickOutside from "@hooks/useOnClickOutside";
import { AccountTypes } from "@typedef/components/Site/account.types";
import { SiteTypes } from "@typedef/components/Site/site.types";

type Props = {
  type: "생성" | "수정";
  inputs: AccountTypes;
  msgs: { [input in "username" | "passwd" | "confirmPasswd"]: string };
  sites: SiteTypes[];
  visibleSites: boolean;
  siteRef: React.RefObject<HTMLDivElement>;
  onChangeVisibleSite: (visible: boolean) => void;
  onChangeUsername: (id: string) => Promise<void>;
  onChangePasswd: (passwd: string) => void;
  onChangeConfirmPasswd: (passwd: string) => void;
  onChangeInputs: (input: "role" | "site", value: string | SiteTypes) => void;
  save: () => Promise<void>;
};

const AccountManage = ({
  type,
  inputs,
  msgs,
  sites,
  visibleSites,
  siteRef,
  onChangeVisibleSite,
  onChangeInputs,
  onChangeUsername,
  onChangePasswd,
  onChangeConfirmPasswd,
  save,
}: Props) => {
  useOnClickOutside({ ref: siteRef, func: () => onChangeVisibleSite(false) });

  return (
    <S.Container>
      <header>
        <h3>계정 {type}</h3>
        <button onClick={save} className="save">
          {type}
        </button>
      </header>
      <S.Inputs>
        <S.InputWrapper>
          <p>권한</p>
          <div className="btns">
            <S.InputBtn
              onClick={() => onChangeInputs("role", "ROLE_ADMIN")}
              active={inputs.role === "ROLE_ADMIN"}
            >
              관리자
            </S.InputBtn>
            <S.InputBtn
              onClick={() => onChangeInputs("role", "ROLE_USER")}
              active={inputs.role === "ROLE_USER"}
            >
              사용자
            </S.InputBtn>
          </div>
        </S.InputWrapper>
        <S.InputWrapper>
          <p>아이디</p>
          <input
            name="username"
            defaultValue={inputs.username}
            onBlur={(e) => onChangeUsername(e.target.value)}
            disabled={type === "수정"}
            placeholder="아이디"
          />
        </S.InputWrapper>
        {msgs.username && <p className="msg">{msgs.username}</p>}
        <S.InputWrapper>
          <p>농가</p>
          <S.Select ref={siteRef}>
            <S.Selected onClick={() => onChangeVisibleSite(true)}>
              {inputs.site.name || "농가 선택"}
            </S.Selected>
            {visibleSites && (
              <S.OptionWrapper>
                <S.Options>
                  {sites.map((site) => (
                    <S.Option
                      key={site.id}
                      onClick={() => {
                        onChangeInputs("site", site);
                        onChangeVisibleSite(false);
                      }}
                      selected={inputs.site.id === site.id}
                    >
                      {site.name}
                    </S.Option>
                  ))}
                </S.Options>
              </S.OptionWrapper>
            )}
          </S.Select>
        </S.InputWrapper>
        <S.InputWrapper>
          <p>비밀번호</p>
          <input
            type="password"
            onBlur={(e) => onChangePasswd(e.target.value)}
            placeholder="4자 이상"
          />
        </S.InputWrapper>
        {msgs.passwd && <p className="msg">{msgs.passwd}</p>}
        <S.InputWrapper>
          <p>비밀번호 확인</p>
          <input
            type="password"
            onChange={(e) => onChangeConfirmPasswd(e.target.value)}
            placeholder="비밀번호 확인"
          />
        </S.InputWrapper>
        {msgs.confirmPasswd && <p className="msg">{msgs.confirmPasswd}</p>}
      </S.Inputs>
    </S.Container>
  );
};

export default AccountManage;
