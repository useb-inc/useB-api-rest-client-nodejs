import HTTPMethod from '../HttpMethods';
import { DataResponse } from '../interfaces';
import Base from './_Base';

interface MaskingBaseRequestParams {
  image_base64: string;
  // TODO: add implementation for File type request
  // image: File;
  secret_mode?: boolean;
}
interface MaskingBaseResponseData {
  image_base64_mask: string;
}

export class Masking extends Base {
  protected _host = 'https://api3.useb.co.kr';

  /**
   * 주민등록증 마스킹
   * @param {string} image_base64 이미지 base64
   * @param {boolean=} [secret_mode] 암호화 적용 여부 (optional)
   */
  idcard = this.callAPIMethod<
    MaskingBaseRequestParams,
    DataResponse<MaskingBaseResponseData>
  >({
    method: HTTPMethod.POST,
    path: '/masking/idcard',
    requiredParams: ['image_base64'],
  });

  /**
   * 운전면허증 마스킹
   * @param {string} image_base64 이미지 base64
   * @param {boolean=} [secret_mode] 암호화 적용 여부 (optional)
   */
  driver = this.callAPIMethod<
    MaskingBaseRequestParams,
    DataResponse<MaskingBaseResponseData>
  >({
    method: HTTPMethod.POST,
    path: '/masking/driver',
    requiredParams: ['image_base64'],
  });

  /**
   * 여권 마스킹
   * @param {string} image_base64 이미지 base64
   * @param {boolean=} [secret_mode] 암호화 적용 여부 (optional)
   */
  passport = this.callAPIMethod<
    MaskingBaseRequestParams,
    DataResponse<MaskingBaseResponseData>
  >({
    method: HTTPMethod.POST,
    path: '/masking/passport',
    requiredParams: ['image_base64'],
  });

  /**
   * 외국인등록증 마스킹
   * @param {string} image_base64 이미지 base64
   * @param {boolean=} [secret_mode] 암호화 적용 여부 (optional)
   */
  alien = this.callAPIMethod<
    MaskingBaseRequestParams,
    DataResponse<MaskingBaseResponseData>
  >({
    method: HTTPMethod.POST,
    path: '/masking/alien',
    requiredParams: ['image_base64'],
  });
}
