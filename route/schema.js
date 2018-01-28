const DirectMessage = require('../Messages/MessageBase/DirectMessage');
const ChannelMessage = require('../Messages/MessageBase/ChannelMessage');
const PrivateChannelMessage = require('../Messages/MessageBase/PrivateChannelMessage');
const MultipartDirectMessage = require('../Messages/MessageBase/MultipartDirectMessage');

const MessageChangedDirect = require('../Messages/MessageSubType/MessageChanged/MessageChangedDirect');
const MessageChangedChannel = require('../Messages/MessageSubType/MessageChanged/MessageChangedChannel');
const MessageChangedMultipartDirect = require('../Messages/MessageSubType/MessageChanged/MessageChangedMultipartDirect');
const MessageChangedPrivate = require('../Messages/MessageSubType/MessageChanged/MessageChangedPrivate');
const BotMessageChannel = require('../Messages/MessageSubType/BotMessage/BotMessageChannel');
const BotMessageDirect = require('../Messages/MessageSubType/BotMessage/BotMessageDirect');
const BotMessageMultipartDirect = require('../Messages/MessageSubType/BotMessage/BotMessageMultipartDirect');

/**
 * Parent property calculates in runtime process
 * @type {*[]}
 */
const SubMessageRoutes = [
    {
        class:MessageChangedDirect,
        routes:[],
    },
    {
        class:MessageChangedChannel,
        routes:[],
    },
    {
        class:MessageChangedMultipartDirect,
        routes:[],
    },
    {
        class:MessageChangedPrivate,
        routes:[],
    },
    {
        class:BotMessageChannel,
        routes:[],
    },
    {
        class:BotMessageDirect,
        routes:[],
    },
    {
        class:BotMessageMultipartDirect,
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