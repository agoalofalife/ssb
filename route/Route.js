


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
};