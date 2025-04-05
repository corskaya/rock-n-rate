import axios from "axios";
import store, { RootState } from "../store";
import env from "./env";

const _getToken = (): string | undefined => {
  const state: RootState = store.getState();
  return state.login.token;
};

const _getLang = (): string => {
  const state: RootState = store.getState();
  return state.lang.language || "en";
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
    request.headers["x-lang"] = _getLang();
    request.headers["Authorization"] = `Bearer ${_getToken()}`;
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
    params,
  });
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const post = (url: string, params?: Record<string, any>) => {
  return instance.post(url, params);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const put = (url: string, params?: Record<string, any>) => {
  return instance.put(url, params);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const patch = (url: string, params?: Record<string, any>) => {
  return instance.patch(url, params);
};

export const del = (url: string) => {
  return instance.delete(url);
};
