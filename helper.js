const fs = require('fs');
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
function version() {
    return JSON.parse(fs.readFileSync('./package.json', 'utf8')).version
}
/**
 * For array pass function which get first argument value second key iteration
 * if after call return null, function continue working else add in new array
 * @param cb
 * @return {Array}
 */
Array.prototype.mapIfNotNull = function (cb) {
    let cacheNewArr = [];
    for(let i = 0; i < this.length; i++){
        let result = cb.call(this, this[i], i);
        if(result !== null){
            cacheNewArr.push(result)
        }
    }
    return cacheNewArr;
};

module.exports = {
    version:version(),
    mixin : mixin
};