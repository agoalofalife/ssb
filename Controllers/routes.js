const DirectMessage = require('../Messages/Message/DirectMessage');
const ChannelMessage = require('../Messages/Message/ChannelMessage');
/**
 * Routes message
 * List classes some types message
 * @type {{}}
 */
const routes = [
    DirectMessage,
    ChannelMessage,
];

// check all routes and return concrete type
// return only first match
module.exports = function (message, baseBot) {
    return routes.map(typeMessage => {
        return typeMessage.route(message) ? new typeMessage(message, baseBot) : null;
    }).shift();
};