const DirectMessage = require('../Messages/MessageBase/DirectMessage');
const ChannelMessage = require('../Messages/MessageBase/ChannelMessage');
const MessageChangedDirect = require('../Messages/MessageSubType/MessageChanged/MessageChangedDirect');
const MessageChangedChannel = require('../Messages/MessageSubType/MessageChanged/MessageChangedChannel');
const MessageChangedMultipartDirect = require('../Messages/MessageSubType/MessageChanged/MessageChangedMultipartDirect');
const MessageChangedPrivate = require('../Messages/MessageSubType/MessageChanged/MessageChangedPrivate');
const BotMessageChannel = require('../Messages/MessageSubType/BotMessage/BotMessageChannel');
const BotMessageDirect = require('../Messages/MessageSubType/BotMessage/BotMessageDirect');
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
    // subtype
    // changed message
    MessageChangedDirect,
    MessageChangedChannel,
    MessageChangedMultipartDirect,
    MessageChangedPrivate,
    // bot meesage
    BotMessageChannel,
    BotMessageDirect,
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