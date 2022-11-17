import {
  Auth,
  Openbank,
  Status,
  Firmbank,
  FirmbankPremium,
  Ocr,
} from './resources';

interface AuthProperties {
  clientId: string;
  clientSecret: string;
}

interface Token {
  jwt: string;
  expires_in: number;
}

interface GetTokenOptions {
  forceRefresh?: boolean;
}

const resources = {
  Openbank,
  Status,
  Auth,
  Firmbank,
  FirmbankPremium,
  Ocr,
} as const;

export class UsebAPI {
  private _clientId: string;
  private _clientSecret: string;
  private _token: Token | null = null;

  public openbank: Openbank;
  public status: Status;
  public auth: Auth;
  public firmbank: Firmbank;
  public firmbankpremium: FirmbankPremium;
  public ocr: Ocr;

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
    if (new Date(this._token?.expires_in).getTime() <= Date.now()) return null;
    return this._token;
  }

  set token(token: Token | null) {
    this._token = token;
  }

  public getToken(options: GetTokenOptions = {}): Promise<Token> {
    const { forceRefresh } = options;
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
