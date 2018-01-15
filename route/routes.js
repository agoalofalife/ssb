const DirectMessage = require('../Messages/MessageBase/DirectMessage');
const ChannelMessage = require('../Messages/MessageBase/ChannelMessage');
const PrivateChannelOrMPDM = require('../Messages/MessageBase/PrivateChannelOrMPDM');
const MessageChangedDirect = require('../Messages/MessageSubType/MessageChanged/MessageChangedDirect');
const MessageChangedChannel = require('../Messages/MessageSubType/MessageChanged/MessageChangedChannel');
const PrivateChannelMessage = require('../Messages/MessageBase/PrivateChannelMessage');
const MultipartDirectMessage = require('../Messages/MessageBase/MultipartDirectMessage');

/**
 * Routes message
 * List classes some types message
 * @type {{}}
 */
const routes = [
    DirectMessage,
    ChannelMessage,
    PrivateChannelMessage,
    MultipartDirectMessage,
    // PrivateChannelOrMPDM,
    // subtype
    MessageChangedDirect,
    MessageChangedChannel,
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