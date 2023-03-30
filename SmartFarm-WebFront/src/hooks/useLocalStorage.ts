type UserTypes = {
  role: "ROLE_ADMIN" | "ROLE_USER";
  siteSeq: number;
};

const ACCESS_TOKEN = "@accessToken";
const USER = "@user";

const useLocalStorage = () => {
  // 토큰
  const getToken = () => {
    return localStorage.getItem(ACCESS_TOKEN);
  };

  const setToken = (accessToken: string) => {
    localStorage.setItem(ACCESS_TOKEN, accessToken);
  };

  const clearToken = () => {
    localStorage.removeItem(ACCESS_TOKEN);
  };

  // 로그인 정보
  const getUser = () => {
    return JSON.parse(localStorage.getItem(USER) || "{}") as UserTypes;
  };

  const setUser = (user: UserTypes) => {
    localStorage.setItem(USER, JSON.stringify(user));
  };

  const clearUser = () => {
    localStorage.removeItem(USER);
  };

  return { getToken, setToken, clearToken, getUser, setUser, clearUser };
};

export default useLocalStorage;
