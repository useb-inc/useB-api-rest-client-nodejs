"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsebAPI = void 0;
const resources_1 = require("./resources");
const resources = {
    OpenAPI: resources_1.OpenAPI,
    Status: resources_1.Status,
};
class UsebAPI {
    constructor(authProperties) {
        this._token = null;
        const { clientId, clientSecret } = authProperties;
        this._clientId = clientId;
        this._clientSecret = clientSecret;
        if (!(this._clientId && this._clientSecret))
            throw new Error('clientId, clientSecret is required');
        this._initResources();
    }
    _initResources() {
        for (const name in resources) {
            this[name.toLowerCase()] = new resources[name](this);
        }
    }
    get token() {
        var _a;
        // 토큰 만료시간이 지났으면 null을 반환
        if (new Date((_a = this._token) === null || _a === void 0 ? void 0 : _a.expires_in).getTime() <= Date.now())
            return null;
        return this._token;
    }
    set token(token) {
        this._token = token;
    }
}
exports.UsebAPI = UsebAPI;
//# sourceMappingURL=UsebAPI.js.map