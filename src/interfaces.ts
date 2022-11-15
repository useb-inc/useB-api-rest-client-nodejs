import HTTPMethod from './constants';
import { AxiosRequestHeaders } from 'axios';

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

export interface UsebAPIResponse<T = Record<string, unknown>> {
  success: boolean;
  message: string;
  transaction_id: string;
  error_code?: string;
  data?: T;
}

export interface UsebAPITokenResponse extends UsebAPIResponse {
  jwt: string;
  expires_in: string;
}
