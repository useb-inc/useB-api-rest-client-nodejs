import HTTPMethod from '../HttpMethods';
import { BaseResponse, DataResponse } from '../interfaces';
import Base from './_Base';

interface IdcardRequestParam {
  identity: string;
  issueDate: string;
  userName: string;
  secret_mode?: boolean;
}
interface DriverRequestParam {
  userName: string;
  birthDate: string;
  licenseNo: string;
  secret_mode?: boolean;
  juminNo?: string;
}
interface PassportRequestParam {
  userName: string;
  passportNo: string;
  issueDate: string;
  expirationDate: string;
  birthDate: string;
  secret_mode?: boolean;
}
interface PassportOverseasRequestParam {
  passportNo: string;
  nationality: string;
  birthDate: string;
  secret_mode?: boolean;
}
interface AlienRequestParam {
  issueNo: string;
  issueDate: string;
  secret_mode?: boolean;
}
interface BusinessRegistrationRequestParam {
  biz_no: string;
}
interface BusinessRegistrationResponseData {
  tax_type_code: string;
  tax_type_name: string;
  closing_date?: string;
  tax_type_change_date?: string;
}
export class Status extends Base {
  protected _host = 'https://api3.useb.co.kr';

  /**
   * 주민등록증 진위확인
   * @param {string} identity 주민등록번호
   * @param {string} issueDate 발급일자
   * @param {string} userName 이름
   * @param {boolean=} [secret_mode] 암호화 적용 여부 (optional)
   */
  idcard = this.callAPIMethod<IdcardRequestParam, BaseResponse>({
    method: HTTPMethod.POST,
    path: '/status/idcard',
    requiredParams: ['identity', 'issueDate', 'userName'],
  });

  /**
   * 운전면허증 진위확인
   * @param {string} userName 이름
   * @param {string} birthDate 생년월일
   * @param {string} licenseNo 면허번호
   * @param {string=} [juminNo] 주민등록번호 (optional)
   * @param {boolean=} [secret_mode] 암호화 적용 여부 (optional)
   */
  driver = this.callAPIMethod<DriverRequestParam, BaseResponse>({
    method: HTTPMethod.POST,
    path: '/status/driver',
    requiredParams: ['userName', 'birthDate', 'licenseNo'],
  });

  /**
   * 여권 진위확인
   * @param {string} userName 이름
   * @param {string} passportNo 여권번호
   * @param {string} issueDate 발급일자
   * @param {string} expirationDate 만료일자
   * @param {string} birthDate 생년월일
   * @param {boolean=} [secret_mode] 암호화 적용 여부 (optional)
   */
  passport = this.callAPIMethod<PassportRequestParam, BaseResponse>({
    method: HTTPMethod.POST,
    path: '/status/passport',
    requiredParams: [
      'userName',
      'passportNo',
      'issueDate',
      'expirationDate',
      'birthDate',
    ],
  });

  /**
   * 해외여권 진위확인
   * @param {string} passportNo 여권번호
   * @param {string} nationality 국적
   * @param {string} birthDate 생년월일
   * @param {boolean=} [secret_mode] 암호화 적용 여부 (optional)
   */
  passportOverseas = this.callAPIMethod<
    PassportOverseasRequestParam,
    BaseResponse
  >({
    method: HTTPMethod.POST,
    path: '/status/passport-overseas',
    requiredParams: ['passportNo', 'nationality', 'birthDate'],
  });

  /**
   * 외국인등록증 진위확인
   * @param {string} issueNo 발급번호
   * @param {string} issueDate 발급일자
   * @param {boolean=} [secret_mode] 암호화 적용 여부 (optional)
   */
  alien = this.callAPIMethod<AlienRequestParam, BaseResponse>({
    method: HTTPMethod.POST,
    path: '/status/alien',
    requiredParams: ['issueNo', 'issueDate'],
  });

  /**
   * 사업자등록증 및 휴폐업조회
   * @param {string} biz_no 사업자등록번호
   */
  businessRegistration = this.callAPIMethod<
    BusinessRegistrationRequestParam,
    DataResponse<BusinessRegistrationResponseData>
  >({
    method: HTTPMethod.POST,
    path: '/status-doc/business-registration',
    requiredParams: ['biz_no'],
  });
}
