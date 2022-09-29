import { useCallback } from 'react';
import { UserTypes } from '@typedef/hooks/user.types';

const USER_KEY = '@user' as const;

export default function useUser() {
  const getUser = useCallback(() => {
    return JSON.parse(localStorage.getItem(USER_KEY) || '{}') as UserTypes;
  }, []);

  const setUser = useCallback((user: UserTypes) => {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }, []);

  const clearUser = useCallback(() => {
    localStorage.removeItem(USER_KEY);
  }, []);

  return { getUser, setUser, clearUser };
}
