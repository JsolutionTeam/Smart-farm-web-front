import { useCallback } from "react";

type UserTypes = {
  role: "ROLE_ADMIN" | "ROLE_USER";
  siteSeq: number;
};

const ACCESS_TOKEN = "@accessToken";
const REFRESH_TOKEN = "@refreshToken";
const USER = "@user";

const useLocalStorage = () => {
  // ACCESS 토큰
  const getToken = useCallback(() => {
    return localStorage.getItem(ACCESS_TOKEN);
  }, []);

  const setToken = (accessToken: string) => {
    localStorage.setItem(ACCESS_TOKEN, accessToken);
  };

  const clearToken = () => {
    localStorage.removeItem(ACCESS_TOKEN);
  };

  const getRefreshToken = () => {
    return localStorage.getItem(REFRESH_TOKEN);
  };

  const setRefreshToken = (refreshToken: string) => {
    localStorage.setItem(REFRESH_TOKEN, refreshToken);
  };

  const clearRefreshToken = () => {
    localStorage.removeItem(REFRESH_TOKEN);
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

  return {
    getToken,
    setToken,
    clearToken,
    getRefreshToken,
    setRefreshToken,
    clearRefreshToken,
    getUser,
    setUser,
    clearUser,
  };
};

export default useLocalStorage;
