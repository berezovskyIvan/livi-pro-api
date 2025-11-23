import { Injectable } from '@nestjs/common';
import Axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosResponseHeaders, RawAxiosResponseHeaders } from 'axios';
import { Config } from '../config';

export class ResponseContainer<T = void> {
  readonly data: T;
  readonly headers: RawAxiosResponseHeaders | AxiosResponseHeaders;
  readonly statusCode: number;
  readonly statusText: string;

  constructor(data: T, statusCode: number, statusText: string, headers: RawAxiosResponseHeaders | AxiosResponseHeaders) {
    this.data = data;
    this.headers = headers;
    this.statusCode = statusCode;
    this.statusText = statusText;
  }
}

@Injectable()
export class RequestService {
  private readonly internetAxiosInstance: AxiosInstance;
  private readonly strApiAxiosInstance: AxiosInstance;

  constructor() {
    this.internetAxiosInstance = Axios.create({
      timeout: Config.globalHttpReqTimeout,
    });
  }

  requestToInternet<T>(config: AxiosRequestConfig): Promise<ResponseContainer<T>> {
    return this.rawRequestWithFullResponse<T>(config, this.internetAxiosInstance);
  }

  requestToStrApiService<T>(config: AxiosRequestConfig): Promise<ResponseContainer<T>> {
    return this.rawRequestWithFullResponse<T>(config, this.strApiAxiosInstance);
  }

  private rawRequestWithFullResponse = async <T>(config: AxiosRequestConfig, axios: AxiosInstance): Promise<ResponseContainer<T>> => {
    const response: AxiosResponse<T> = await axios.request(config);

    return new ResponseContainer(response.data, response.status, response.statusText, response.headers);
  };
}
