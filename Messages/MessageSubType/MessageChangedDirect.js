const DirectMessage = require('../MessageBase/DirectMessage');

module.exports = class MessageChangedDirect extends DirectMessage {

    /**
     * @link https://api.slack.com/events/message.im
     * @return {string}
     */
    get typeEvent() {
        return 'message_changed.message.im';
    }
    /**
     * Description event
     * @return {string}
     */
    get descriptionEvent() {
        return 'The event occurs when a message was changed in direct(personal)';
    }
    /**
     * check route
     * @param comparable
     * @return {boolean}
     */
    static route(comparable) {
        return comparable.type === 'message' &&
            comparable.subtype === 'message_changed' &&
            comparable.channel !== undefined &&
            comparable.channel.charAt(0) === this.firstLetter() &&
            comparable.message !== undefined;
    }

    get getResponse(){
        return this.response.message.text;
    }
};

