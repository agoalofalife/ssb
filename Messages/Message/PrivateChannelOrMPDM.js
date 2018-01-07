// From Private Channel or multi-person direct message

const mixin = require('../../helper').mixin;
const MixinMention = require('../Mixins/Mention');
const FirstLetter = 'G';


module.exports = mixin(MixinMention.prototype, ['constructor'])(class PrivateChannelOrMPDM {
    /**
     *
     * @param response
     * @param baseBot class BaseBot
     */
    constructor(response, baseBot){
        this.response = response;
        this.base = baseBot;
    }
    /**
     * @link https://api.slack.com/events/message.im
     * @return {string} || {array}
     */
    get typeEvent() {
        return ['message.groups', 'message.mpim'];
    }

    /**
     * check route
     * @param comparable
     * @return {boolean}
     */
    static route(comparable) {
        return comparable.type === 'message' &&
            comparable.subtype === undefined &&
            comparable.channel !== undefined && comparable.channel.charAt(0) === FirstLetter;
    }

    async reply(message, params) {
        if (this.response.channel) {
            return this.base.postMessage(this.response.channel, message, params);
        }
    }
});

