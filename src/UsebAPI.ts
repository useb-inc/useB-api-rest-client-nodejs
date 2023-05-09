import { ONE_MINUTE } from './constants';
import {
  Auth,
  Openbank,
  Status,
  Firmbank,
  FirmbankPremium,
  Ocr,
  Masking,
  Face,
} from './resources';

interface AuthProperties {
  clientId: string;
  clientSecret: string;
}

interface Token {
  jwt: string;
  expires_in: number;
}

/**
 * @param {boolean} forceRefresh 토큰 강제 갱신 여부
 * @param {number} tokenLeadTime 토큰 만료시간 이전에 토큰을 갱신할 시간 (단위: ms) - 기본값: 5분
 */
interface GetTokenOptions {
  forceRefresh?: boolean;
  tokenLeadTime?: number; // 토큰 만료시간 이전에 토큰을 갱신할 시간 (단위: ms)
}

const resources = {
  Openbank,
  Status,
  Auth,
  Firmbank,
  FirmbankPremium,
  Ocr,
  Masking,
  Face,
} as const;

export class UsebAPI {
  private _clientId: string;
  private _clientSecret: string;
  private _token: Token | null = null;
  private _tokenLeadTime = 5 * ONE_MINUTE; // 5분

  public openbank: Openbank;
  public status: Status;
  public auth: Auth;
  public firmbank: Firmbank;
  public firmbankpremium: FirmbankPremium;
  public ocr: Ocr;
  public masking: Masking;
  public face: Face;

  constructor(authProperties: AuthProperties) {
    const { clientId, clientSecret } = authProperties;
    this._clientId = clientId;
    this._clientSecret = clientSecret;
    if (!(this._clientId && this._clientSecret))
      throw new Error('clientId, clientSecret is required');

    this._initResources();
  }

  private _initResources(): void {
    for (const name in resources) {
      this[name.toLowerCase()] = new resources[name](this);
    }
  }
  get token(): Token | null {
    // 토큰 만료시간이 지났으면 null을 반환
    if (new Date(this._token?.expires_in).getTime() <= (Date.now() + this._tokenLeadTime)) return null;
    return this._token;
  }

  set token(token: Token | null) {
    this._token = token;
  }

  get clientId(): string {
    return this._clientId;
  }

  get clientSecret(): string {
    return this._clientSecret;
  }

  /**
   * @description
   * 토큰 발급 함수
   * @param {boolean} options.forceRefresh 토큰 강제 갱신 여부
   * @param {number} options.tokenLeadTime 토큰 만료시간 이전에 토큰을 갱신할 시간 (단위: ms) - 기본값: 5분
   * @returns {Promise<Token>}
   */
  public requestToken(options: GetTokenOptions = {}): Promise<Token> {
    const { forceRefresh, tokenLeadTime } = options;
    this._tokenLeadTime = tokenLeadTime || this._tokenLeadTime;
    const _this = this;

    return new Promise<Token>(function (resolve, reject) {
      // 토큰이 만료됬거나 강제 재발급이 아니면 저장된 토큰을 반환
      if (_this.token && !forceRefresh) return resolve(_this.token);

      // 토큰이 만료됬거나 강제 재발급이면 새로운 토큰을 발급받음
      const b64 = Buffer.from(
        _this._clientId + ':' + _this._clientSecret,
      ).toString('base64');

      _this.auth
        .token({
          headers: { Authorization: `Basic ${b64}` },
        })
        .then((data) => {
          const token: Token = {
            jwt: data.jwt,
            expires_in: new Date(data.expires_in).getTime(),
          };
          _this.token = token;
          return resolve(token);
        })
        .catch((err) => reject(err));
    });
  }
}

export default UsebAPI;
