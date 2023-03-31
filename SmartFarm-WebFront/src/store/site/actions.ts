export type SiteTypes = {
  crop: string; // 작물
  delay: 10; // 농가 인지시스템 센서장비 데이터 수신 주기
  id: 11; // 농가번호
  ip: null; // 농가 인지시스템 센서장비 마지막 수신 네트워크 ip
  location: string; // 지역
  name: string; // 농가명
  siteIpUpdatedAt: null; // 농가 인지시스템 센서장비 마지막 수신 시간
};

const SET = "SET";
const CLEAR = "CLEAR";

export const setSite = (site: SiteTypes) => {
  return {
    type: SET,
    site: site,
  };
};

export const clearSite = () => {
  return {
    type: CLEAR,
    site: null,
  };
};

export type SiteActionType =
  | ReturnType<typeof setSite>
  | ReturnType<typeof clearSite>;
