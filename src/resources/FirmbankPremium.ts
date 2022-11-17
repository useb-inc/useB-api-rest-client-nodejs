import HTTPMethod from '../constants';
import { BaseResponse, DataResponse } from '../interfaces';
import Base from './_Base';

type SendCodeType = 'korean' | 'english' | 'number';
type SendCodePosition = 'front' | 'back';
interface RealnameParams {
  bank_code: string;
  account_num: string;
  account_holder_info: string;
  secret_mode?: boolean;
}
interface RealnameResponseData {
  account_holder_name: string;
}
interface SendParams {
  bank_code: string;
  account_num: string;
  code_type: SendCodeType | string;
  code_position?: SendCodePosition;
  secret_mode?: boolean;
}
interface SendResponseData {
  tid: string;
}
interface VerifyParams {
  tid: string;
  print_content: string;
}

export class FirmbankPremium extends Base {
  protected _host = 'https://openapi.useb.co.kr';

  /**
   * [펌뱅킹 프리미엄] 계좌실명조회
   * @param {string} bank_code 은행코드
   * @param {string} account_num 계좌번호
   * @param {string} account_holder_info 생년월일 또는 사업자등록번호
   * @param {boolean=} [secret_mode] 암호화 적용 여부 (optional)
   */
  realname = this.callAPIMethod<
    RealnameParams,
    DataResponse<RealnameResponseData>
  >({
    method: HTTPMethod.POST,
    path: '/firmbank-custom/realname',
    requiredParams: ['bank_code', 'account_num', 'account_holder_info'],
  });

  /**
   * [펌뱅킹 프리미엄] 1원입금이체
   * @param {string} bank_code 은행코드
   * @param {string} account_num 계좌번호
   * @param {string} code_type 인증코드타입(korean, english, number) 또는 계좌에 찍히길 원하는 글자(한글 1~3글자). 1234{글자} 형태가 됩니다.
   * @param {string=} [code_position] 인증 코드 위치(예 : front, back), front는 1234유스비(3글자까지 가능), back은 유스1234(2글자까지 권장, 3글자인 경우 인증코드가 짤리는 경우 발생할 수 있습니다)(optional)
   * @param {boolean=} [secret_mode] 암호화 적용 여부 (optional)
   */
  send = this.callAPIMethod<SendParams, DataResponse<SendResponseData>>({
    method: HTTPMethod.POST,
    path: '/firmbank-custom/send',
    requiredParams: ['bank_code', 'account_num', 'code_type'],
  });

  /**
   * [펌뱅킹 프리미엄] 1원입금이체 검증
   * @param {string} tid 거래번호
   * @param {string} print_content 인증코드
   */
  verify = this.callAPIMethod<VerifyParams, BaseResponse>({
    method: HTTPMethod.POST,
    path: '/firmbank-custom/verify',
    requiredParams: ['tid', 'print_content'],
  });
}
