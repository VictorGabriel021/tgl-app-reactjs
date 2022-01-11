import axios, { AxiosRequestHeaders, Method } from "axios";

const BASE_URL = "http://127.0.0.1:3333";

type Request = {
  method?: Method;
  url: string;
  data?: object | string;
  params?: object;
  headers?: AxiosRequestHeaders;
};

export const makeRequest = ({ method = "GET", url, data, params, headers }: Request) => {
  return axios({
    method,
    url: `${BASE_URL}${url}`,
    data,
    params,
    headers,
  });
};
