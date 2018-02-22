//  base classes
const DirectMessage = require('../Messages/MessageBase/DirectMessage');
const ChannelMessage = require('../Messages/MessageBase/ChannelMessage');
const PrivateChannelMessage = require('../Messages/MessageBase/PrivateChannelMessage');
const MultipartDirectMessage = require('../Messages/MessageBase/MultipartDirectMessage');

// sub message type
const BotMessage = require('../Messages/MessageSubType/BotMessage');
const MessageChanged = require('../Messages/MessageSubType/MessageChanged');
const ChannelArchive = require('../Messages/MessageSubType/ChannelArchive');
const ChannelJoin = require('../Messages/MessageSubType/ChannelJoin');
const PinnedItem = require('../Messages/MessageSubType/PinnedItem');

// others
const Conversation = require('../Messages/Conversation');
const Command = require('../Messages/Command');

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
    {
        class:ChannelArchive,
        routes:[],
    },
    {
        class:ChannelJoin,
        routes:[],
    },
    {
        class:PinnedItem,
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
    {
        class:Conversation,
    },
    {
        class:Command,
    }
];

module.exports = MessageRoutes;