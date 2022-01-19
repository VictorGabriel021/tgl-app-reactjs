import axios, { AxiosRequestHeaders, Method } from "axios";
import { toast } from "react-toastify";

type Request = {
  method?: Method;
  url: string;
  data?: object | string;
  params?: object;
  headers?: AxiosRequestHeaders;
};

const instance = axios.create({
  baseURL: "http://127.0.0.1:3333",
});

instance.defaults.headers.post["Content-Type"] = "application/json";

instance.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (!error.response) {
      toast.error("Erro de conexão", {
        position: toast.POSITION.TOP_RIGHT,
      });
    } else {
      toast.error(error.response.data.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
    return Promise.reject(error);
  }
);

export const makeRequest = ({
  method = "GET",
  url,
  data,
  params,
  headers,
}: Request) => {
  return instance({
    method,
    url,
    data,
    params,
    headers,
  });
};
