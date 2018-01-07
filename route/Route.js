


module.exports = class Route {
     route(response, classMessage, context) {
        let cacheFn = function (regexp, callback) {
            if (new RegExp(regexp).test(response.text)) {
                 callback.call(context || this, response, classMessage);
            }
            // for flow interface
            return {
                route:cacheFn
            };
        };
        return cacheFn;
    }
    async routeMention(response, classMessage, context){
        let isMention = await classMessage.isMention();

        let cacheFn = async function (regexp, callback) {
            if (isMention && new RegExp(regexp).test(response.text)) {
                callback.call(context || this, response, classMessage);
            }
            // for flow interface
            return {
                route:cacheFn
            };
        };
        return cacheFn;
    }
};