import { OpenAPI, Status } from './resources';

interface AuthProperties {
  clientId: string;
  clientSecret: string;
}

interface Token {
  jwt: string;
  expires_in: number;
}

const resources = {
  OpenAPI,
  Status,
} as const;
export class UsebAPI {
  private _clientId: string;
  private _clientSecret: string;
  private _token: Token | null = null;

  public openapi: OpenAPI;
  public status: Status;

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
}

const usebAPI = new UsebAPI({
  clientId: '123',
  clientSecret: '123',
});

usebAPI.openapi.realname({});
// console.log(usebAPI.openapi.host);
