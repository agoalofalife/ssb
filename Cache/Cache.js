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
    async route(message, driverCache, callback, ...paramsCallback){
        let cache = driverCache.get(message.channel);
        if (cache === undefined) {
            return driverCache.save(message.channel, await callback.apply(this, paramsCallback));
        }
        // get cache
        return cache;
    }
};