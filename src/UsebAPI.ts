import { Auth, OpenAPI, Status } from './resources';
import { UsebAPIResponse, UsebAPITokenResponse } from './interfaces';
import axios from 'axios';

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
  OpenAPI,
  Status,
  Auth,
} as const;

export class UsebAPI {
  private _clientId: string;
  private _clientSecret: string;
  private _token: Token | null = null;

  public openapi: OpenAPI;
  public status: Status;
  public auth: Auth;

  constructor(authProperties: AuthProperties) {
    const { clientId, clientSecret } = authProperties;
    this._clientId = clientId;
    this._clientSecret = clientSecret;
    if (!(this._clientId && this._clientSecret))
      throw new Error('clientId, clientSecret is required');

    this._initResources();
  }

  private _initResources() {
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

  public getToken(options: GetTokenOptions = {}) {
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
        .then((data: UsebAPITokenResponse) => {
          const token: Token = {
            jwt: data.jwt,
            expires_in: new Date(data.expires_in).getTime(),
          };
          _this.token = token;
          return resolve(token);
        })
        .catch();
    });
  }
}

const usebAPI = new UsebAPI({
  clientId: '383a261ed6410f37f605a5c06e8b66e7',
  clientSecret: 'ad30efde654f3e926bd00760069056b5',
});

// console.log(usebAPI.auth);

usebAPI
  .getToken()
  .then((token) => {
    console.log(JSON.stringify(token));
  })
  .catch((err) => {
    console.log(err);
  });
