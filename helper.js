/**
 *
 * @param obj from is mixin
 * @param excludeMethods list exclude methods
 * @return {Function}
 */
function mixin(obj, excludeMethods = []) {
    return function (target) {
        for (const key of Object.getOwnPropertyNames(obj)) {
            if (excludeMethods.indexOf(key) === -1) {
                target.prototype[key] = obj[key];
            }
        }
        return target;
    }
}


module.exports = {
    mixin : mixin
};