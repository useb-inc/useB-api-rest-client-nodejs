import HTTPMethod from '../HttpMethods';
import { API_BASE_HOST } from '../constants';
import { BaseResponse } from '../interfaces';
import Base from './_Base';

interface VerifyParams {
  // TODO: implement File type
  face1: string;
  face2: string;
}
interface VerifyResponse extends BaseResponse {
  isIdentical: boolean;
  confidence: number;
}
export class Face extends Base {
  protected _host = API_BASE_HOST;

  /**
   * 안면일치여부 확인
   * @param {string} face1 비교할 얼굴 이미지 base64
   * @param {string} face2 비교할 얼굴 이미지 base64
   */
  verify = this.callAPIMethod<VerifyParams, VerifyResponse>({
    method: HTTPMethod.POST,
    path: '/face/verify',
    requiredParams: ['face1', 'face2'],
  });
}
