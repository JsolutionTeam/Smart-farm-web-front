import axios from "axios";
import useLocalStorage from "@hooks/useLocalStorage";

const DEV = "http://192.168.0.195:18080/api";
const PROD = "http://39.112.10.37/api";

export const API_ORIGIN = process.env.NODE_ENV === "development" ? PROD : PROD;

axios.defaults.baseURL = API_ORIGIN;

axios.interceptors.request.use((req) => {
  if (process.env.NODE_ENV === "development") {
    // console.log(req);
  }

  return req;
});

axios.interceptors.response.use(
  (res) => {
    if (process.env.NODE_ENV === "development") {
      // console.log(res);
    }

    return res;
  },
  async (error) => {
    const originalConfig = error.config;
    const {
      getToken,
      setToken,
      clearToken,
      getRefreshToken,
      setRefreshToken,
      clearRefreshToken,
      clearUser,
    } = useLocalStorage();

    if (error.response.status === 401 && !originalConfig._retry) {
      originalConfig._retry = true;

      const { config, data } = await requestPost<{
        accessToken: "";
        refreshToken: "";
      }>(
        "/auth/refresh",
        {},
        {
          refreshToken: getRefreshToken(),
        }
      );

      if (config.status >= 200 && config.status < 400) {
        setToken(data.accessToken);
        setRefreshToken(data.refreshToken);
        window.location.reload();
      } else {
        if (getToken()) {
          alert("장시간 미사용으로 로그아웃 되었습니다.");
          clearToken();
          clearRefreshToken();
          clearUser();
          window.location.reload();
        }
      }
    }

    return Promise.reject(error);
  }
);

export type BasicApiResponse<T> = {
  data: T;
  config: {
    status: number;
  };
};

export type BasicListApiResponse<T> = {
  data: T;
  meta: {
    page: number;
    take: number;
    itemCount: number;
    pageCount: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
  };
};

export function requestGet<T>(
  url: string,
  header: object
): Promise<BasicApiResponse<T>> {
  return axios
    .get(url, {
      headers: {
        "Content-Type": "application/json",
        ...header,
      },
    })
    .then(
      (res) =>
        ({
          data: res.data as T,
          config: {
            status: res.status,
            ...res.data?.meta,
          },
        } as BasicApiResponse<T>)
    )
    .catch((err) => {
      console.error("[Axios Error]", err);

      return {
        data: {} as T,
        config: {
          status: -1,
        },
      } as BasicApiResponse<T>;
    });
}

export function requestSecureGet<T>(
  url: string,
  header: object,
  token: string
): Promise<BasicApiResponse<T>> {
  return axios
    .get(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        ...header,
      },
    })
    .then(
      (res) =>
        ({
          data: res.data as T,
          config: {
            status: res.status,
            ...res.data?.meta,
          },
        } as BasicApiResponse<T>)
    )
    .catch((err) => {
      console.error("[Axios Error]", err);

      return {
        data: {} as T,
        config: {
          status: -1,
        },
      } as BasicApiResponse<T>;
    });
}

export function requestDelete<T>(
  url: string,
  header: object
): Promise<BasicApiResponse<T>> {
  return axios
    .delete(url, {
      headers: {
        "Content-Type": "application/json",
        ...header,
      },
    })
    .then(
      (res) =>
        ({
          data: res.data as T,
          config: {
            status: res.status,
            ...res.data?.meta,
          },
        } as BasicApiResponse<T>)
    )
    .catch((err) => {
      console.error("[Axios Error]", err);

      return {
        data: {} as T,
        config: {
          status: -1,
        },
      } as BasicApiResponse<T>;
    });
}

export function requestSecureDelete<T>(
  url: string,
  header: object,
  token: string
): Promise<BasicApiResponse<T>> {
  return axios
    .delete(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
        ...header,
      },
    })
    .then(
      (res) =>
        ({
          data: res.data as T,
          config: {
            status: res.status,
            ...res.data?.meta,
          },
        } as BasicApiResponse<T>)
    )
    .catch((err) => {
      console.error("[Axios Error]", err);

      return {
        data: {} as T,
        config: {
          status: -1,
        },
      } as BasicApiResponse<T>;
    });
}
export function requestSecurePost<T>(
  url: string,
  header: object,
  body: object,
  token: string
): Promise<BasicApiResponse<T>> {
  return axios
    .post(url, body, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
        ...header,
      },
    })
    .then(
      (res) =>
        ({
          data: res.data as T,
          config: {
            status: res.status,
            ...res.data?.meta,
          },
        } as BasicApiResponse<T>)
    )
    .catch((err) => {
      console.error("[Axios Error]", err);

      return {
        data: {} as T,
        config: {
          status: -1,
        },
      } as BasicApiResponse<T>;
    });
}

export function requestPost<T>(
  url: string,
  header: object,
  body: object
): Promise<BasicApiResponse<T>> {
  return axios
    .post(url, body, {
      headers: {
        "Content-Type": "application/json",
        ...header,
      },
    })
    .then(
      (res) =>
        ({
          data: res.data as T,
          config: {
            status: res.status,
            ...res.data?.meta,
          },
        } as BasicApiResponse<T>)
    )
    .catch((err) => {
      console.error("[Axios Error]", err.response);

      return {
        data: {} as T,
        config: {
          status: -1,
        },
      } as BasicApiResponse<T>;
    });
}

export function requestSecurePut<T>(
  url: string,
  header: object,
  body: object,
  token: string
): Promise<BasicApiResponse<T>> {
  return axios
    .put(url, body, {
      headers: {
        "Content-Type": "application/json",
        "X-AUTH-TOKEN": `${token}`,
        ...header,
      },
    })
    .then(
      (res) =>
        ({
          data: res.data?.data as T,
          config: {
            status: res.status,
            msg: res.data?.msg,
            code: res.data?.code,
            success: res.data?.success,
            version: res.data?.version,
          },
        } as BasicApiResponse<T>)
    )
    .catch((err) => {
      console.error("[Axios Error]", err);

      return {
        data: {} as T,
        config: {
          status: -1,
        },
      } as BasicApiResponse<T>;
    });
}

export function requestSecurePatch<T>(
  url: string,
  header: object,
  body: object,
  token: string
): Promise<BasicApiResponse<T>> {
  return axios
    .patch(url, body, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
        ...header,
      },
    })
    .then(
      (res) =>
        ({
          data: res.data as T,
          config: {
            status: res.status,
            ...res.data?.meta,
          },
        } as BasicApiResponse<T>)
    )
    .catch((err) => {
      console.error("[Axios Error]", err);

      return {
        data: {} as T,
        config: {
          status: -1,
        },
      } as BasicApiResponse<T>;
    });
}

export function requestMultipart<T>(
  url: string,
  header: object,
  body: FormData,
  token: string
): Promise<BasicApiResponse<T>> {
  return axios
    .post(url, body, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `${token}`,
        ...header,
      },
    })
    .then(
      (res) =>
        ({
          data: res.data as T,
          config: {
            status: res.status,
            ...res.data?.meta,
          },
        } as BasicApiResponse<T>)
    )
    .catch((err) => {
      console.error("[Axios Error]", err);

      return {
        data: {} as T,
        config: {
          status: -1,
        },
      } as BasicApiResponse<T>;
    });
}
