// From Private Channel or multi-person direct message

const mixin = require('../../helper').mixin;
const MixinMention = require('../Mixins/Mention');
const Message = require('./Message');

module.exports = mixin(MixinMention.prototype, ['constructor'])(class PrivateChannelOrMPDM extends Message{
    /**
     *
     * @return {string}
     */
    static firstLetter() {
        return 'G';
    }
    /**
     * @link https://api.slack.com/events/message.im
     * @return {string} || {array}
     */
    get typeEvent() {
        return ['message.groups', 'message.mpim'];
    }

    /**
     * Description event
     * @return {string}
     */
    get descriptionEvent() {
        return 'The event occurs when a message arrives in private channel or multi direct-group';
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

