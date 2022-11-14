"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Base = void 0;
class Base {
    constructor(_apiClass) {
        this._apiClass = _apiClass;
    }
    callAPIMethod(spec) {
        const { path, method, urlParam, requiredParams } = spec;
    }
}
exports.Base = Base;
exports.default = Base;
//# sourceMappingURL=_Base.js.map