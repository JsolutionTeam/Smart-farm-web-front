import {SiteTypes} from "@store/site/actions";

export type AccountTypes = {
    address: ""; // 주소
    email: ""; // 이메일
    name: ""; // 관리자명
    phone: ""; // 전화번호
    role: "ROLE_ADMIN" | "ROLE_USER";
    site?: SiteTypes;
    username: string; // 아이디 (관리자명)
};

export type AccountManageTypes = {
    // USER
    username: string; // 아이디
    address: string; // 농가주소
    email: string; // 이메일
    name: string; // 관리자명
    password: string; // 비밀번호
    phone: string; // 전화번호
    role: "ROLE_ADMIN" | "ROLE_USER";

    // SITE
    siteSeq?: number;
    siteCrop?: string; // 작물
    siteLocation?: string; // 지역
    siteName?: string; // 농가명
    siteApiKey?: string;
    siteDelay?: number;
};

export const roleKor = (role: string) => {
    switch (role) {
        case "ROLE_ADMIN":
            return "관리자";
        case "ROLE_USER":
            return "사용자";
        default:
            return "알수없음";
    }
}
