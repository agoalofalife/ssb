const mixin = require('../../helper').mixin;
const MixinMention = require('../Mixins/Mention');
const Message = require('./Message');

module.exports = mixin(MixinMention.prototype, ['constructor'])(class DirectMessage extends Message{
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
});

