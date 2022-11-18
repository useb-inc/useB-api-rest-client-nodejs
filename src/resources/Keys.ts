import HTTPMethod from '../HttpMethods';
import { DataResponse } from '../interfaces';
import Base from './_Base';

interface ClientIdSecretParams {
  client_id: string;
  client_secret: string;
}
interface GenerateKeyPairParams extends ClientIdSecretParams {}
interface GenerateKeyPairResponseData {
  public_key: string;
  private_key: string;
}
interface RegisterPublicKeyParams extends ClientIdSecretParams {
  public_key: string;
}
interface RegisterPublicKeyResponseData {
  userid: string;
  public_key: string;
}
interface ExchangeKeysParams extends ClientIdSecretParams {}
interface ExchangeKeysResponseData {
  encrypted_ses_key: string;
  encrypted_sym_key: string;
  expiry_date: string;
}
interface ExtractKeysParams {
  encrypted_ses_key: string;
  encrypted_sym_key: string;
  private_key: string;
}
interface ExtractKeysResponseData {
  sym_key: string;
}
interface EncryptParams {
  sym_key: string;
  plaintext: string;
}
interface EncryptResponseData {
  ciphertext: string;
}
interface DecryptParams {
  sym_key: string;
  ciphertext: string;
}
interface DecryptResponseData {
  plaintext: string;
}
export class Keys extends Base {
  protected _host = 'https://auth.useb.co.kr';

  /**
   * RSA2048 공개키 비밀키 생성
   * @private
   * @param {string} client_id 클라이언트 아이디
   * @param {string} client_secret 클라이언트 시크릿
   */
  private _generateKeyPair = this.callAPIMethod<
    GenerateKeyPairParams,
    DataResponse<GenerateKeyPairResponseData>
  >({
    method: HTTPMethod.POST,
    path: '/keys/generate-key-pair',
    requiredParams: ['client_id', 'client_secret'],
  });
  /**
   * RSA2048 공개키 비밀키 생성
   */
  generateKeyPair() {
    return this._generateKeyPair({
      param: {
        client_secret: this._apiClass.clientSecret,
        client_id: this._apiClass.clientId,
      },
    });
  }
  /**
   * 공개키 등록
   * @private
   * @param {string} client_id 클라이언트 아이디
   * @param {string} client_secret 클라이언트 시크릿
   * @param {string} public_key 공개키
   */
  private _registerPublicKey = this.callAPIMethod<
    RegisterPublicKeyParams,
    DataResponse<RegisterPublicKeyResponseData>
  >({
    method: HTTPMethod.POST,
    path: '/keys/register-public-key',
    requiredParams: ['client_id', 'client_secret', 'public_key'],
  });
  /**
   * 공개키 등록
   * @param publicKey 공개키
   */
  registerPublicKey(publicKey: string) {
    return this._registerPublicKey({
      param: {
        client_secret: this._apiClass.clientSecret,
        client_id: this._apiClass.clientId,
        public_key: publicKey,
      },
    });
  }
  /**
   * 키교환
   * @private
   * @param {string} client_id 클라이언트 아이디
   * @param {string} client_secret 클라이언트 시크릿
   */
  private _exchangeKeys = this.callAPIMethod<
    ExchangeKeysParams,
    DataResponse<ExchangeKeysResponseData>
  >({
    method: HTTPMethod.POST,
    path: '/keys/exchange-keys',
    requiredParams: ['client_id', 'client_secret'],
  });
  /**
   * 키교환
   */
  exchangeKeys() {
    return this._exchangeKeys({
      param: {
        client_secret: this._apiClass.clientSecret,
        client_id: this._apiClass.clientId,
      },
    });
  }

  /**
   * 키 추출
   * @param {string} encrypted_ses_key RSA 암호화된 세션키
   * @param {string} encrypted_sym_key AES 암호화된 대칭키
   * @param {string} private_key RSA2048 개인키
   */
  extractKeys = this.callAPIMethod<
    ExtractKeysParams,
    DataResponse<ExtractKeysResponseData>
  >({
    method: HTTPMethod.POST,
    path: '/keys/extract-keys',
    requiredParams: ['encrypted_ses_key', 'encrypted_sym_key', 'private_key'],
  });

  /**
   * 암호화
   * @param {string} sym_key 대칭키
   * @param {string} plaintext 평문
   */
  encrypt = this.callAPIMethod<
    EncryptParams,
    DataResponse<EncryptResponseData>
  >({
    method: HTTPMethod.POST,
    path: '/keys/encrypt',
    requiredParams: ['sym_key', 'plaintext'],
  });

  /**
   * 복호화
   * @param {string} sym_key 대칭키
   * @param {string} ciphertext 암호문
   */
  decrypt = this.callAPIMethod<
    DecryptParams,
    DataResponse<DecryptResponseData>
  >({
    method: HTTPMethod.POST,
    path: '/keys/decrypt',
    requiredParams: ['sym_key', 'ciphertext'],
  });
}
