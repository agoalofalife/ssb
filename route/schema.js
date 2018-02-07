//  base classes
const DirectMessage = require('../Messages/MessageBase/DirectMessage');
const ChannelMessage = require('../Messages/MessageBase/ChannelMessage');
const PrivateChannelMessage = require('../Messages/MessageBase/PrivateChannelMessage');
const MultipartDirectMessage = require('../Messages/MessageBase/MultipartDirectMessage');

// sub message type
const BotMessage = require('../Messages/MessageSubType/BotMessage');
const MessageChanged = require('../Messages/MessageSubType/MessageChanged');

/**
 * Parent property calculates in runtime process
 * @type {*[]}
 */
const SubMessageRoutes = [
    {
        class:BotMessage,
        routes:[],
    },
    {
        class:MessageChanged,
        routes:[],
    },
];
/**
 * Routes message
 * List classes some types message
 * @type {{}}
 */
const MessageRoutes = [
    {
        class:DirectMessage,
        routes:SubMessageRoutes,
    },
    {
        class:ChannelMessage,
        routes:SubMessageRoutes,
    },
    {
        class:PrivateChannelMessage,
        routes:SubMessageRoutes,
    },
    {
        class:MultipartDirectMessage,
        routes:SubMessageRoutes,
    },
];

module.exports = MessageRoutes;