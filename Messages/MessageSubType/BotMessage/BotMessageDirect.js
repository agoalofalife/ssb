const DirectMessage = require('../../MessageBase/DirectMessage');

module.exports = class BotMessageDirect extends DirectMessage {

    /**
     * @link https://api.slack.com/events/message.im
     * @return {string}
     */
    get typeEvent() {
        return 'bot_message.message.im';
    }
    /**
     * Description event
     * @return {string}
     */
    get descriptionEvent() {
        return 'The event occurs when a message was sent by a bot in direct(personal)';
    }
    /**
     * check route
     * @param comparable
     * @return {boolean}
     */
    static route(comparable) {
        return comparable.type === 'message' &&
            comparable.subtype === 'bot_message' &&
            comparable.channel !== undefined &&
            comparable.channel.charAt(0) === this.firstLetter() &&
            comparable.bot_id !== undefined;
    }

    get compareResponse(){
        return this.response.text;
    }
};

