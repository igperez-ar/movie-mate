import { AxiosRequestHeaders } from 'axios';

export enum AxiosMethodEnum {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
  PATCH = 'PATCH',
}

export enum AxiosResponseEnum {
  JSON = 'json',
  TEXT = 'text',
}

export interface IAxios {
  request<T>(
    method: AxiosMethodEnum,
    url: string,
    body?: any,
    responseType?: AxiosResponseEnum,
    headers?: AxiosRequestHeaders,
  ): Promise<T>;

  get<T>(
    url: string,
    responseType?: AxiosResponseEnum,
    headers?: AxiosRequestHeaders,
  ): Promise<T>;

  post<T>(
    url: string,
    body?: any,
    responseType?: AxiosResponseEnum,
    headers?: AxiosRequestHeaders,
  ): Promise<T>;

  put<T>(
    url: string,
    body?: any,
    responseType?: AxiosResponseEnum,
    headers?: AxiosRequestHeaders,
  ): Promise<T>;

  patch<T>(
    url: string,
    body?: any,
    responseType?: AxiosResponseEnum,
    headers?: AxiosRequestHeaders,
  ): Promise<T>;

  delete<T>(
    url: string,
    responseType?: AxiosResponseEnum,
    headers?: AxiosRequestHeaders,
  ): Promise<T>;
}
