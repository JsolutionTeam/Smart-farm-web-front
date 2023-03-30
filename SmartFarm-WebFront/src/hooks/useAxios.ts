import { useState } from "react";
import axios, { AxiosError } from "axios";

const DEV = "http://192.168.0.215:18080/api";
const PROD = "http://39.112.10.37/api";

const BASE_URL = process.env.NODE_ENV === "development" ? PROD : PROD;

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const useAxios = <T extends {}>() => {
  const [response, setResponse] = useState<T | null>(null);
  const [error, setError] = useState<AxiosError | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  axiosInstance.interceptors.request.use(
    (config) => {
      // if (config.headers) {
      //   config.headers.Authorization = "token";
      // }

      return config;
    },
    (err) => {
      return Promise.reject(err);
    }
  );

  const requestApi = async (
    method: "GET" | "POST" | "PATCH" | "DELETE",
    url: string,
    body?: object,
    headers?: { [key: string]: string }
  ) => {
    setIsLoading(true);
    try {
      const res = await axiosInstance({
        method: method,
        url: url,
        data: body,
        headers: headers,
      });
      setResponse(res.data);
    } catch (err: unknown) {
      setError(err as AxiosError);
    } finally {
      setIsLoading(false);
    }
  };

  return { response, error, isLoading, requestApi };
};

export default useAxios;
