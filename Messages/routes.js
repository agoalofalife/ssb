const DirectMessage = require('./Message/DirectMessage');

/**
 * Routes message
 * List classes some types message
 * @type {{}}
 */
const routes = [
    DirectMessage,
];

// check all routes and return concrete type
// return only first match
module.exports = function (message, baseBot) {
    return routes.map(typeMessage => {
        return typeMessage.route(message) ? new typeMessage(message, baseBot) : null;
    }).shift();
};