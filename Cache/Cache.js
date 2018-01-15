/**
 *
 * @type {module.Cache}
 */
module.exports = class Cache {
    /**
     * Cache route, to increase performance in the class search
     * @param message
     * @param driverCache
     * @param callback
     * @param paramsCallback
     */
    route(message, driverCache, callback, ...paramsCallback){
        let cache = driverCache.get(message.channel);
        if (cache === undefined) {
            return callback.apply(this, paramsCallback);
        }
        // get cache
        return cache;
    }
};