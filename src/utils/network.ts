import axios from "axios";
import store, { RootState } from "../store";
import env from "./env";

const _getToken = (): string | undefined => {
  const state: RootState = store.getState();
  return state.login.token;
};

const instance = axios.create({
  baseURL: env.serverUrl,
});

// response middleware
instance.interceptors.response.use(
  (response) => {
    // console.log("--response", response);
    return response;
  },
  (error) => {
    console.log("--error.response", error);
    if (error.message === "Network Error") {
      throw new Error("Server Not Reachable");
    }

    return error.response;
  }
);

// request middleware
instance.interceptors.request.use(
  (request) => {
    // console.log("--request", request);
    return request;
  },
  (error) => {
    console.log("--error.request", error);
  }
);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const get = (url: string, params?: Record<string, any>) => {
  return instance.get(url, {
    headers: {
      Authorization: `Bearer ${_getToken()}`,
    },
    params,
  });
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const post = (url: string, params?: Record<string, any>) => {
  return instance.post(url, params, {
    headers: {
      Authorization: `Bearer ${_getToken()}`,
    },
  });
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const put = (url: string, params?: Record<string, any>) => {
  return instance.put(url, params, {
    headers: {
      Authorization: `Bearer ${_getToken()}`,
    },
  });
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const patch = (url: string, params?: Record<string, any>) => {
  return instance.patch(url, params, {
    headers: {
      Authorization: `Bearer ${_getToken()}`,
    },
  });
};

export const del = (url: string) => {
  return instance.delete(url, {
    headers: {
      Authorization: `Bearer ${_getToken()}`,
    },
  });
};
