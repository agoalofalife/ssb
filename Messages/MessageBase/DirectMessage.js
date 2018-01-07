const mixin = require('../../helper').mixin;
const MixinMention = require('../Mixins/Mention');

module.exports = mixin(MixinMention.prototype, ['constructor'])(class DirectMessage {
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
     * @return {string}
     */
    get typeEvent() {
        return 'message.im';
    }

    get getResponse(){
        return this.response.text;
    }

    static firstLetter() {
        return 'D';
    }
    /**
     * check route
     * @param comparable
     * @return {boolean}
     */
    static route(comparable) {
        return comparable.type === 'message' &&
            comparable.subtype === undefined &&
            comparable.channel !== undefined && comparable.channel.charAt(0) === this.firstLetter;
    }

    async reply(message, params) {
        if (this.response.channel) {
            return this.base.postMessage(this.response.channel, message, params);
        }
    }
});
