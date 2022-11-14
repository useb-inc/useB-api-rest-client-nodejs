import { OpenAPI, Status } from './resources';
interface AuthProperties {
    clientId: string;
    clientSecret: string;
}
interface Token {
    jwt: string;
    expires_in: number;
}
export declare class UsebAPI {
    private _clientId;
    private _clientSecret;
    private _token;
    openapi: OpenAPI;
    status: Status;
    constructor(authProperties: AuthProperties);
    private _initResources;
    get token(): Token | null;
    set token(token: Token | null);
}
export {};
