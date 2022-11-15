import HTTPMethod from '../constants';
import { UsebAPI } from '../UsebAPI';
import _ from 'lodash';
import axios, {
  AxiosRequestConfig,
  AxiosRequestHeaders,
  AxiosResponse,
  AxiosError,
} from 'axios';
import {
  CallAPIMethodOptions,
  MethodSpec,
  UsebAPIResponse,
  UsebAPITokenResponse,
} from '../interfaces';

type PromiseResponse<D = any> =
  | UsebAPIResponse<D>
  | UsebAPITokenResponse
  | AxiosError<UsebAPIResponse>;

export class Base {
  protected _host: string;
  constructor(private _apiClass: UsebAPI, private _axiosInstance) {
    this._axiosInstance = axios.create({
      baseURL: this._host,
    });
  }

  get host(): string {
    return this._host;
  }

  /**
   * @description
   * API host url 오버라이딩 함수
   * @param {string} host
   * @returns {Base}
   * @example
   * const usebAPI = new UsebAPI({
   *  clientId: 'your client id',
   *  clientSecret: 'your client secret',
   * });
   * usebAPI.openapi.overrideHost('https://openapi-test.useb.co.kr');
   */
  public overrideHost(host: string) {
    this._host = host;
    return this;
  }

  private async _makeHeaders(): Promise<AxiosRequestHeaders> {
    const headers = {
      'Content-Type': 'application/json',
      'User-Agent': 'useb-api-nodejs',
    };
    const accessToken = await this._apiClass.getToken();
    if (accessToken) {
      headers['Authorization'] = 'Bearer ' + accessToken.jwt;
    }
    return headers;
  }

  private async _makeRequest<D = any>(
    method: HTTPMethod,
    url: string,
    params: any,
    extraHeaders: AxiosRequestHeaders,
  ): Promise<PromiseResponse<D>> {
    const axiosConfig: AxiosRequestConfig = {
      url,
      method,
      data: params,
    };
    if (/\/oauth\/token/.test(url)) {
      axiosConfig.headers = extraHeaders;
    } else {
      axiosConfig.headers = {
        ...(await this._makeHeaders()),
        ...extraHeaders,
      };
    }

    return this._axiosInstance
      .request(axiosConfig)
      .then((response: AxiosResponse<UsebAPIResponse>) => {
        const { data } = response;
        return Promise.resolve(data);
      })
      .catch((err: AxiosError<UsebAPIResponse>) => {
        return Promise.reject(err);
      });
  }

  /**
   * @description
   * API 호출을 위한 url 생성 함수
   * @param {string[]} params
   * @returns {string}
   */
  private _makeUrl(path: string[]) {
    // regex replace leading and trailing slash
    return path.map((s) => s.replace(/(^\/|\/$)/g, '')).join('/');
  }

  protected callAPIMethod<D = any>(spec: MethodSpec) {
    const { path, method, urlParam, requiredParams } = spec;
    const _this = this;

    return function (options: CallAPIMethodOptions = {}) {
      let { param, headers } = options;
      const stack = new Error().stack;
      const apiParams: string[] = [_this._host, path];

      // urlParam이 정의되어있으나 param에 없으면 에러
      if (urlParam) {
        if (!_.has(param, urlParam)) {
          return new Promise(function (resolve, reject) {
            reject(new Error('Param missing: ' + urlParam));
          });
        }
        apiParams.push(param[urlParam]);
        param = _.omit(param, urlParam);
      }

      for (let i = 0; i < requiredParams?.length || 0; i++) {
        if (!_.has(param, requiredParams[i])) {
          return new Promise(function (resolve, reject) {
            reject(new Error('Param missing: ' + requiredParams[i]));
          });
        }
      }

      let API_BASE = _this._makeUrl(apiParams);
      // if method is GET and param is not empty, add query string
      if (method === HTTPMethod.GET && !_.isEmpty(param)) {
        API_BASE += '?' + new URLSearchParams(param).toString();
        param = _.omit(_.keys(param)); // clear param object
      }

      return new Promise<PromiseResponse<D>>(function (resolve, reject) {
        _this
          ._makeRequest(method, API_BASE, param, headers)
          .then((data) => resolve(data))
          .catch((error) => {
            if (error.stack && stack) {
              error.stack +=
                '\nFrom previous event: ' + stack.substr(stack.indexOf('\n'));
            }
            reject(error);
          });
      });
    };
  }
}
export default Base;
