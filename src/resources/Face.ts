import HTTPMethod from '../HttpMethods';
import { API_BASE_HOST } from '../constants';
import { BaseResponse } from '../interfaces';
import Base from './_Base';

interface MatchParams {
  // TODO: implement File type
  face1: string;
  face2: string;
}
interface MatchResponse extends BaseResponse {
  isIdentical: boolean;
  confidence: number;
}
interface LivenessParams extends MatchParams {
  face3: string;
  face4: string;
}
interface LivenessResponse extends MatchResponse {}
export class Face extends Base {
  protected _host = API_BASE_HOST;

  /**
   * 안면일치여부 확인
   * @param {string} face1 비교할 얼굴 이미지 base64
   * @param {string} face2 비교할 얼굴 이미지 base64
   */
  match = this.callAPIMethod<MatchParams, MatchResponse>({
    method: HTTPMethod.POST,
    path: '/face/match',
    requiredParams: ['face1', 'face2'],
  });

  /**
   * 안면일치여부 확인(라이브니스)
   * @param {string} face1 비교할 얼굴 이미지 base64
   * @param {string} face2 비교할 얼굴 이미지 base64
   * @param {string} face3 비교할 얼굴 이미지 base64
   * @param {string} face4 비교할 얼굴 이미지 base64
   */
  liveness = this.callAPIMethod<LivenessParams, LivenessResponse>({
    method: HTTPMethod.POST,
    path: '/face/liveness',
    requiredParams: ['face1', 'face2', 'face3', 'face4'],
  });

  /**
   * **DEPRECATED** 안면일치여부 확인
   * @param {string} face1 비교할 얼굴 이미지 base64
   * @param {string} face2 비교할 얼굴 이미지 base64
   * @deprecated
   * `verify`는 더이상 호출이 불가하므로 `match` 메소드를 사용해주세요.
   */
  verify = this.callAPIMethod<MatchParams, MatchResponse>({
    method: HTTPMethod.POST,
    path: '/face/verify',
    requiredParams: ['face1', 'face2'],
    deprecated: true,
  });
}
