import { AxiosRequestHeaders, AxiosResponse } from 'axios';
import HTTPMethod from './HttpMethods';

export interface MethodSpec {
  method?: HTTPMethod;
  path: string;
  urlParam?: string | null;
  requiredParams?: string[] | null;
}
export interface CallAPIMethodOptions<P> {
  param?: P;
  headers?: AxiosRequestHeaders;
}

export interface BaseResponse {
  success: boolean;
  message: string;
  transaction_id: string;
}

export interface ErrorResponse extends BaseResponse {
  error_code?: string;
}

export interface DataResponse<T = Record<string, unknown>>
  extends BaseResponse {
  data?: T;
}

export type None = Record<string, unknown>;

export type UsebApiErrorResponse = AxiosResponse<ErrorResponse>;
