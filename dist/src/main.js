"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.greeter = exports.Delays = void 0;
const tslib_1 = require("tslib");
/**
 * Some predefined delay values (in milliseconds).
 */
var Delays;
(function (Delays) {
    Delays[Delays["Short"] = 500] = "Short";
    Delays[Delays["Medium"] = 2000] = "Medium";
    Delays[Delays["Long"] = 5000] = "Long";
})(Delays = exports.Delays || (exports.Delays = {}));
/**
 * Returns a Promise<string> that resolves after a given time.
 *
 * @param {string} name - A name.
 * @param {number=} [delay=Delays.Medium] - A number of milliseconds to delay resolution of the Promise.
 * @returns {Promise<string>}
 */
function delayedHello(name, delay = Delays.Medium) {
    return new Promise((resolve) => setTimeout(() => resolve(`Hello, ${name}`), delay));
}
// Please see the comment in the .eslintrc.json file about the suppressed rule!
// Below is an example of how to use ESLint errors suppression. You can read more
// at https://eslint.org/docs/latest/user-guide/configuring/rules#disabling-rules
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function greeter(name) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        // The name parameter should be of type string. Any is used only to trigger the rule.
        return yield delayedHello(name, Delays.Long);
    });
}
exports.greeter = greeter;
//# sourceMappingURL=main.js.map