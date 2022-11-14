"use strict";
/**
 * @license
 * Copyright (c) 2018-present, Loomble Inc <opensource@loomble.com>
 * Copyright (c) 2018-preset, Jay Rylan <jay@jayrylan.com>
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * Included documentation is from "[HTTP request methods][MDN]" by
 * [Mozilla Contributors][Contributors] and licensed under
 * [CC-BY-SA 4.0][CC-BY-SA].
 *
 * [MDN]: https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods
 * [Contributors]: https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods$history
 * [CC-BY-SA]: https://creativecommons.org/licenses/by-sa/4.0/legalcode
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.HTTPMethod = void 0;
/**
 * HTTP request methods.
 *
 * HTTP defines a set of request methods to indicate the desired action to be
 * performed for a given resource. Although they can also be nouns, these
 * request methods are sometimes referred as HTTP verbs. Each of them implements
 * a different semantic, but some common features are shared by a group of them:
 * e.g. a request method can be safe, idempotent, or cacheable.
 *
 * @public
 */
var HTTPMethod;
(function (HTTPMethod) {
    /**
     * The `CONNECT` method establishes a tunnel to the server identified by the
     * target resource.
     */
    HTTPMethod["CONNECT"] = "CONNECT";
    /**
     * The `DELETE` method deletes the specified resource.
     */
    HTTPMethod["DELETE"] = "DELETE";
    /**
     * The `GET` method requests a representation of the specified resource.
     * Requests using GET should only retrieve data.
     */
    HTTPMethod["GET"] = "GET";
    /**
     * The `HEAD` method asks for a response identical to that of a GET request,
     * but without the response body.
     */
    HTTPMethod["HEAD"] = "HEAD";
    /**
     * The `OPTIONS` method is used to describe the communication options for the
     * target resource.
     */
    HTTPMethod["OPTIONS"] = "OPTIONS";
    /**
     * The PATCH method is used to apply partial modifications to a resource.
     */
    HTTPMethod["PATCH"] = "PATCH";
    /**
     * The `POST` method is used to submit an entity to the specified resource,
     * often causing a change in state or side effects on the server.
     */
    HTTPMethod["POST"] = "POST";
    /**
     * The `PUT` method replaces all current representations of the target
     * resource with the request payload.
     */
    HTTPMethod["PUT"] = "PUT";
    /**
     * The `TRACE` method performs a message loop-back test along the path to the
     * target resource.
     */
    HTTPMethod["TRACE"] = "TRACE";
})(HTTPMethod = exports.HTTPMethod || (exports.HTTPMethod = {}));
/**
 * @public
 */
exports.default = HTTPMethod;
//# sourceMappingURL=constants.js.map