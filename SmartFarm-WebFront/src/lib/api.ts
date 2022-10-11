import axios from 'axios';

const dev = 'http://192.168.0.108:18080/api';
const prod = 'http://14.45.108.75/sf_viewer/backend/api';

export const API_ORIGIN = process.env.NODE_ENV === 'development' ? dev : prod;

axios.defaults.baseURL = API_ORIGIN;

axios.interceptors.request.use((req) => {
  if (process.env.NODE_ENV === 'development') {
    console.log(req);
  }

  return req;
});

axios.interceptors.response.use((res) => {
  if (process.env.NODE_ENV === 'development') {
    console.log(res);
  }

  return res;
});

export const apiRoute = {
  auth: {
    login: '/auth/login',
    refresh: '/auth/refresh',
  },
  site: '/v1/site/',
};

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
  header: object,
): Promise<BasicApiResponse<T>> {
  return axios
    .get(url, {
      headers: {
        'Content-Type': 'application/json',
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
        } as BasicApiResponse<T>),
    )
    .catch((err) => {
      console.error('[Axios Error]', err);

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
  token: string,
): Promise<BasicApiResponse<T>> {
  return axios
    .get(url, {
      headers: {
        'Content-Type': 'application/json',
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
        } as BasicApiResponse<T>),
    )
    .catch((err) => {
      console.error('[Axios Error]', err);

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
  header: object,
): Promise<BasicApiResponse<T>> {
  return axios
    .delete(url, {
      headers: {
        'Content-Type': 'application/json',
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
        } as BasicApiResponse<T>),
    )
    .catch((err) => {
      console.error('[Axios Error]', err);

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
  token: string,
): Promise<BasicApiResponse<T>> {
  return axios
    .delete(url, {
      headers: {
        'Content-Type': 'application/json',
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
        } as BasicApiResponse<T>),
    )
    .catch((err) => {
      console.error('[Axios Error]', err);

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
  token: string,
): Promise<BasicApiResponse<T>> {
  return axios
    .post(url, body, {
      headers: {
        'Content-Type': 'application/json',
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
        } as BasicApiResponse<T>),
    )
    .catch((err) => {
      console.error('[Axios Error]', err);

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
  body: object,
): Promise<BasicApiResponse<T>> {
  return axios
    .post(url, body, {
      headers: {
        'Content-Type': 'application/json',
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
        } as BasicApiResponse<T>),
    )
    .catch((err) => {
      console.error('[Axios Error]', err.response);

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
  token: string,
): Promise<BasicApiResponse<T>> {
  return axios
    .patch(url, body, {
      headers: {
        'Content-Type': 'application/json',
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
        } as BasicApiResponse<T>),
    )
    .catch((err) => {
      console.error('[Axios Error]', err);

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
  token: string,
): Promise<BasicApiResponse<T>> {
  return axios
    .post(url, body, {
      headers: {
        'Content-Type': 'multipart/form-data',
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
        } as BasicApiResponse<T>),
    )
    .catch((err) => {
      console.error('[Axios Error]', err);

      return {
        data: {} as T,
        config: {
          status: -1,
        },
      } as BasicApiResponse<T>;
    });
}
