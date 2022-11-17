import HTTPMethod from '../constants';
import { DataResponse } from '../interfaces';
import Base from './_Base';

// 공통 요청 파라미터 인터페이스화
interface OcrBaseRequestParams {
  image_base64: string;
  // TODO: add implementation for File type request
  // image: File;
  mask_mode?: boolean;
  is_color?: boolean;
  secret_mode?: boolean;
}
// 공통 응답 데이터 인터페이스화
interface OcrBaseResponseData {
  idType: string;
  userName: string;
}
interface IdcardParams extends OcrBaseRequestParams {}
interface IdcardResponseData extends OcrBaseResponseData {
  juminNo1: string;
  juminNo2: string;
  _juminNo2: string;
  issueDate: string;
}
interface DriverParams extends OcrBaseRequestParams {}
interface DriverResponseData extends OcrBaseResponseData {
  driverNo: string;
  juminNo1: string;
  juminNo2: string;
  _juminNo2: string;
  issueDate: string;
}
interface PassportParams extends OcrBaseRequestParams {}
interface PassportResponseData extends OcrBaseResponseData {
  userNameEng: string;
  passportNo: string;
  issueNo1: string;
  issueNo2: string;
  _juminNo2: string;
  gender: string;
  birthDate: string;
  issueDate: string;
  expiryDate: string;
  mrz1: string;
  mrz2: string;
}
interface PassportOverseasRequestParam
  extends Omit<OcrBaseRequestParams, 'mask_mode'> {}
interface PassportOverseasResponseData extends OcrBaseResponseData {
  passportNo: string;
  nationality: string;
  gender: string;
  birthDate: string;
  expiryDate: string;
  mrz1: string;
  mrz2: string;
}
interface AlienParams extends OcrBaseRequestParams {}
interface AlienResponseData extends OcrBaseResponseData {
  country: string;
  countryCode: string;
  visa: string;
  issueNo: string;
  issueNo1: string;
  issueNo2: string;
  _juminNo2: string;
  issueDate: string;
}
interface BusinessRegistrationParams
  extends Pick<OcrBaseRequestParams, 'image_base64'> {}
interface BusinessRegistrationResponseData {
  docSize: string;
  docType: string;
  companyName: string;
  ownerName: string;
  businessRegNum: string;
  businessCorpNum: string;
  companyAddr: string;
  HQAddr: string;
  openDate: string;
  businessType1: string;
  businessType2: string;
}

export class Ocr extends Base {
  protected _host = 'https://api3.useb.co.kr';

  /**
   * 주민등록증 OCR
   * @param {string} image_base64 이미지 base64
   * @param {boolean=} [mask_mode] 마스킹 적용 여부 (optional)
   * @param {boolean=} [is_color] 컬러 이미지 여부 (optional)
   * @param {boolean=} [secret_mode] 암호화 적용 여부 (optional)
   */
  idcard = this.callAPIMethod<IdcardParams, DataResponse<IdcardResponseData>>({
    method: HTTPMethod.POST,
    path: '/ocr/idcard-driver',
    requiredParams: ['image_base64'],
  });

  /**
   * 운전면허증 OCR
   * @param {string} image_base64 이미지 base64
   * @param {boolean=} [mask_mode] 마스킹 적용 여부 (optional)
   * @param {boolean=} [is_color] 컬러 이미지 여부 (optional)
   * @param {boolean=} [secret_mode] 암호화 적용 여부 (optional)
   */
  driver = this.callAPIMethod<DriverParams, DataResponse<DriverResponseData>>({
    method: HTTPMethod.POST,
    path: '/ocr/idcard-driver',
    requiredParams: ['image_base64'],
  });

  /**
   * 여권 OCR
   * @param {string} image_base64 이미지 base64
   * @param {boolean=} [mask_mode] 마스킹 적용 여부 (optional)
   * @param {boolean=} [is_color] 컬러 이미지 여부 (optional)
   * @param {boolean=} [secret_mode] 암호화 적용 여부 (optional)
   */
  passport = this.callAPIMethod<
    PassportParams,
    DataResponse<PassportResponseData>
  >({
    method: HTTPMethod.POST,
    path: '/ocr/passport',
    requiredParams: ['image_base64'],
  });

  /**
   * 해외여권 OCR
   * @param {string} image_base64 이미지 base64
   * @param {boolean=} [mask_mode] 마스킹 적용 여부 (optional)
   * @param {boolean=} [is_color] 컬러 이미지 여부 (optional)
   * @param {boolean=} [secret_mode] 암호화 적용 여부 (optional)
   */
  passportOverseas = this.callAPIMethod<
    PassportOverseasRequestParam,
    DataResponse<PassportOverseasResponseData>
  >({
    method: HTTPMethod.POST,
    path: '/ocr/passport-overseas',
    requiredParams: ['image_base64'],
  });

  /**
   * 외국인등록증 OCR
   * @param {string} image_base64 이미지 base64
   * @param {boolean=} [mask_mode] 마스킹 적용 여부 (optional)
   * @param {boolean=} [is_color] 컬러 이미지 여부 (optional)
   * @param {boolean=} [secret_mode] 암호화 적용 여부 (optional)
   */
  alien = this.callAPIMethod<AlienParams, DataResponse<AlienResponseData>>({
    method: HTTPMethod.POST,
    path: '/ocr/alien',
    requiredParams: ['image_base64'],
  });

  /**
   * 사업자등록증 OCR
   * @param {string} image_base64 이미지 base64
   */
  businessRegistration = this.callAPIMethod<
    BusinessRegistrationParams,
    DataResponse<BusinessRegistrationResponseData>
  >({
    method: HTTPMethod.POST,
    path: '/ocr-doc/business-registration',
    requiredParams: ['image_base64'],
  });
}
