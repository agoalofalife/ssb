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
    /**
     * Description event
     * @return {string}
     */
    get descriptionEvent() {
        return 'The event occurs when a message arrives in direct(personal)';
    }
    get compareResponse(){
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
            comparable.channel !== undefined && comparable.channel.charAt(0) === this.firstLetter();
    }

    async reply(message, params) {
        if (this.response.channel) {
            return await this.base.postMessage(this.response.channel, message, params);
        }
    }

    /**
     * Post reply only the one who sent
     * @link https://api.slack.com/methods/chat.postEphemeral
     * @param message
     * @param params
     * @return {Promise<vow.Promise>}
     */
    async replyEphemeral(message, params) {
        if (this.response.channel && this.response.user) {
            return await this.base.postEphemeral(this.response.channel, this.response.user,  message, params);
        }
    }
});

