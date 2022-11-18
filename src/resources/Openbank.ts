import HTTPMethod from '../HttpMethods';
import { BANKING_BASE_HOST } from '../constants';
import { BaseResponse, DataResponse } from '../interfaces';
import Base from './_Base';

interface RealnameParams {
  bank_code: string;
  account_num: string;
  account_holder_info_type: string;
  account_holder_info: string;
  secret_mode?: boolean;
}
interface RealnameResponseData {
  bank_code: string;
  bank_name: string;
  account_num: string;
  account_holder_name: string;
}
interface SendParams {
  bank_code: string;
  account_num: string;
  account_holder_name: string;
  code_type: string;
  client_name?: string;
  client_business_num?: string;
  code_position?: string;
  secret_mode?: boolean;
}
interface VerifyParams {
  transaction_id: string;
  print_content: string;
}
interface VerifyResponseData {
  pair_transaction_id: string;
  print_content: string;
}
export class Openbank extends Base {
  protected _host = BANKING_BASE_HOST;

  /**
   * [오픈뱅킹] 계좌실명조회
   * @param {string} bank_code 은행코드
   * @param {string} account_num 계좌번호
   * @param {string} account_holder_info_type 예금주정보유형
   * @param {string} account_holder_info 예금주정보
   * @param {boolean=} [secret_mode] 암호화 적용 여부 (optional)
   */
  realname = this.callAPIMethod<
    RealnameParams,
    DataResponse<RealnameResponseData>
  >({
    method: HTTPMethod.POST,
    path: '/realname',
    requiredParams: [
      'bank_code',
      'account_num',
      'account_holder_info_type',
      'account_holder_info',
    ],
  });

  /**
   * [오픈뱅킹] 1원입금 인증코드발송
   * @param {string} bank_code 은행코드
   * @param {string} account_num 계좌번호
   * @param {string} account_holder_name 예금주명
   * @param {string} code_type 인증코드유형
   * @param {string=} [client_name] 고객사명 (optional)
   * @param {string=} [client_business_num] 고객사사업자번호 (optional)
   * @param {string=} [code_position] 인증코드위치 (optional)
   * @param {boolean=} [secret_mode] 암호화 적용 여부 (optional)
   */
  send = this.callAPIMethod<SendParams, BaseResponse>({
    method: HTTPMethod.POST,
    path: '/send',
    requiredParams: [
      'bank_code',
      'account_num',
      'account_holder_name',
      'code_type',
    ],
  });

  /**
   * [오픈뱅킹] 1원입금 인증코드검증
   * @param {string} transaction_id API로그 아이디
   * @param {string} print_content 인증코드
   */
  verify = this.callAPIMethod<VerifyParams, DataResponse<VerifyResponseData>>({
    method: HTTPMethod.POST,
    path: '/verify',
    requiredParams: ['transaction_id', 'print_content'],
  });
}
