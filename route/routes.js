require('../helper');
const DirectMessage = require('../Messages/MessageBase/DirectMessage');
const ChannelMessage = require('../Messages/MessageBase/ChannelMessage');
const PrivateChannelOrMPDM = require('../Messages/MessageBase/PrivateChannelOrMPDM');
const MessageChangedDirect = require('../Messages/MessageSubType/MessageChanged/MessageChangedDirect');
const MessageChangedChannel = require('../Messages/MessageSubType/MessageChanged/MessageChangedChannel');
const PrivateChannelMessage = require('../Messages/MessageBase/PrivateChannelMessage');

/**
 * Routes message
 * List classes some types message
 * @type {{}}
 */
const routes = [
    // DirectMessage,
    // ChannelMessage,
    PrivateChannelMessage,
    // PrivateChannelOrMPDM,
    // subtype
    // MessageChangedDirect,
    // MessageChangedChannel,
];

function router(message, baseBot) {
    return routes.mapIfNotNull(async typeMessage => {
        return await typeMessage.route(message, baseBot) ? new typeMessage(message, baseBot) : null;
    }).shift();
}
// check all routes and return concrete type
// return only first match
module.exports = {
    router:router,
    routes:routes,
};