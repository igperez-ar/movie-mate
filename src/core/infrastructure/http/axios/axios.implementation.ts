import type { AxiosRequestConfig, AxiosResponse } from 'axios';
import { apiInstance, defaultHeaders } from './axios.instance';
import { AxiosMethodEnum, AxiosResponseEnum, type IAxios } from './axios.interface';

export class AxiosImplementation implements IAxios {
  private readonly REQUEST_TIMEOUT: number = 30000;

  public async request<T>(
    method: AxiosMethodEnum,
    url: string,
    body?: any,
    responseType: AxiosResponseEnum = AxiosResponseEnum.JSON,
    headers?: AxiosRequestConfig['headers'],
  ): Promise<T> {
    const config: AxiosRequestConfig = {
      url,
      method,
      data: body,
      headers: { ...defaultHeaders, ...headers },
      responseType,
      timeout: this.REQUEST_TIMEOUT,
    };

    try {
      const responseAxios: AxiosResponse<T> = await apiInstance.request(config);
      return responseAxios?.data;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  public async get<T>(
    url: string,
    responseType: AxiosResponseEnum = AxiosResponseEnum.JSON,
    headers?: AxiosRequestConfig['headers'],
  ): Promise<T> {
    try {
      return await this.request(AxiosMethodEnum.GET, url, undefined, responseType, headers);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  public async post<T>(
    url: string,
    body?: any,
    responseType: AxiosResponseEnum = AxiosResponseEnum.JSON,
    headers?: AxiosRequestConfig['headers'],
  ): Promise<T> {
    try {
      return await this.request<T>(AxiosMethodEnum.POST, url, body, responseType, headers);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  public async put<T>(
    url: string,
    body?: any,
    responseType: AxiosResponseEnum = AxiosResponseEnum.JSON,
    headers?: AxiosRequestConfig['headers'],
  ): Promise<T> {
    try {
      return await this.request<T>(AxiosMethodEnum.PUT, url, body, responseType, headers);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  public async patch<T>(
    url: string,
    body?: any,
    responseType: AxiosResponseEnum = AxiosResponseEnum.JSON,
    headers?: AxiosRequestConfig['headers'],
  ): Promise<T> {
    try {
      return await this.request(AxiosMethodEnum.PATCH, url, body, responseType, headers);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  public async delete<T>(
    url: string,
    responseType: AxiosResponseEnum = AxiosResponseEnum.JSON,
    headers?: AxiosRequestConfig['headers'],
  ): Promise<T> {
    try {
      return await this.request<T>(AxiosMethodEnum.DELETE, url, undefined, responseType, headers);
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
