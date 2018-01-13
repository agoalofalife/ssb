const mixin = require('../../helper').mixin;
const MixinMention = require('../Mixins/Mention');
const Message = require('./Message');

module.exports = mixin(MixinMention.prototype, ['constructor'])(class ChannelMessage extends Message{

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

    /**
     * Description event
     * @return {string}
     */
    get descriptionEvent() {
        return 'The event occurs when a message arrives in channel'
    }

    get compareResponse(){
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
            comparable.channel !== undefined && comparable.channel.charAt(0) === this.firstLetter();
    }
});

