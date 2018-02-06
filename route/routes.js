const DirectMessage = require('../Messages/MessageBase/DirectMessage');
const ChannelMessage = require('../Messages/MessageBase/ChannelMessage');


/**
 * Routes message
 * List classes some types message
 * @type {{}}
 */
const routes = [
    DirectMessage,
    ChannelMessage,
];

/**
 * Determines the appropriate route
 * After the first match, the search stops
 * It's a linear search
 * @param message
 * @param baseBot
 * @return {Promise<*>}
 */
async function router(message, baseBot) {
    for(let typeMessage of routes) {
        if(await typeMessage.route(message, baseBot)){
         return new typeMessage(message, baseBot)
        }
    }
    return null;
}

// check all routes and return concrete type
// return only first match
module.exports = {
    router:router,
    routes:routes,
};