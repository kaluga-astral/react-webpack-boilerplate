import { stringify } from 'query-string';
import axios, {
  AxiosError,
  AxiosInstance,
  AxiosPromise,
  AxiosRequestConfig,
  AxiosResponse,
} from 'axios';

export type HttpService = AxiosInstance;

export type HttpServiceError = AxiosError;

export type HttpServiceResponse<T, D = T> = AxiosResponse<T, D>;

export type HttpServicePromise<T> = AxiosPromise<T>;

type HttpServiceConfig = AxiosRequestConfig;

export const createHttpService = (
  config: HttpServiceConfig = {},
): HttpService =>
  axios.create({
    ...config,
    paramsSerializer: (params) => {
      return stringify(params);
    },
  });

export const setStaticAuthToken = (httpService: HttpService, token: string) => {
  // eslint-disable-next-line
  httpService.defaults.headers.common.authorization = token;
};
