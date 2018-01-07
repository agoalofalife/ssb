const mixin = require('../../helper').mixin;
const MixinMention = require('../Mixins/Mention');

module.exports = mixin(MixinMention.prototype, ['constructor'])(class ChannelMessage {

    /**
     *
     * @param response
     * @param baseBot class BaseBot
     */
    constructor(response, baseBot){
        this.response = response;
        this.base = baseBot;
    }

    static firstLetter() {
        return 'C';
    }
    /**
     * @link https://api.slack.com/events/message.im
     * @return {string}
     */
    get typeEvent() {
        return 'message.channels';
    }

    get getResponse(){
        return this.response.text;
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
        let user = await this.base.getUserById(this.response.user);
        if (user.name) {
            return this.base.postMessage(user.name, message, params);
        }
    }
});

