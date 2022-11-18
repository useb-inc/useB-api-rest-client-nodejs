import HTTPMethod from '../HttpMethods';
import { BaseResponse, DataResponse } from '../interfaces';
import Base from './_Base';

interface SendParams {
  bank_code: string;
  account_num: string;
  account_holder_name: string;
  secret_mode?: boolean;
}
interface SendResponseData {
  tid: string;
}
interface VerifyParams {
  tid: string;
  print_content: string;
}
export class Firmbank extends Base {
  protected _host = 'https://openapi.useb.co.kr';

  /**
   * [펌뱅킹] 1원입금이체
   * @param {string} bank_code 은행코드
   * @param {string} account_num 계좌번호
   * @param {string} account_holder_name 예금주명
   * @param {boolean=} [secret_mode] 암호화 적용 여부 (optional)
   */
  send = this.callAPIMethod<SendParams, DataResponse<SendResponseData>>({
    method: HTTPMethod.POST,
    path: '/firmbank/send',
    requiredParams: ['bank_code', 'account_num', 'account_holder_name'],
  });

  /**
   * [펌뱅킹] 1원인증코드검증
   * @param {string} tid 거래ID
   * @param {string} print_content 인증코드
   */
  verify = this.callAPIMethod<VerifyParams, BaseResponse>({
    method: HTTPMethod.POST,
    path: '/firmbank/verify',
    requiredParams: ['tid', 'print_content'],
  });
}
