/**
 * 
 * @type {module.Route}
 */
module.exports = class Route {
     route(classMessage, context) {
        let cacheFn = function (regexp, callback) {
            if (new RegExp(regexp).test(classMessage.compareResponse)) {
                 callback.call(context || this, classMessage.response, classMessage);
            }
            // for flow interface
            return {
                route:cacheFn
            };
        };
        return cacheFn;
    }
    async routeMention(classMessage, context){
        let isMention = await classMessage.isMention();

        let cacheFn = async function (regexp, callback) {
            if (isMention && new RegExp(regexp).test(classMessage.compareResponse)) {
                callback.call(context || this, classMessage.response, classMessage);
            }
            // for flow interface
            return {
                route:cacheFn
            };
        };
        return cacheFn;
    }
};