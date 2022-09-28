import { useCallback } from 'react';

const ACCESS_TOKEN_KEY = '@accessToken' as const;

export default function useToken() {
  const getToken = useCallback(() => {
    return localStorage.getItem(ACCESS_TOKEN_KEY);
  }, []);

  const setToken = useCallback((accessToken: string) => {
    localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
  }, []);

  const clearToken = useCallback((accessToken: string) => {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
  }, []);

  return {
    getToken,
    setToken,
    clearToken,
  };
}
