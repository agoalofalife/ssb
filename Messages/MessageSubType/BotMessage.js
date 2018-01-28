const Message = require('./../MessageBase/Message');
/**
 *
 * @type {module.BotMessage}
 */
module.exports = class BotMessage extends Message{
    /**
     * @link https://api.slack.com/events/message.im
     * @return {string}
     */
    get typeEvent() {
        return `${this.parent.typeEvent}.bot_message`;
    }

    /**
     * Description event
     * @return {string}
     */
    get descriptionEvent() {
        return 'The event occurs when a message was sent by a bot in the channel';
    }
    /**
     * check route
     * @param comparable
     * @return {boolean}
     */
    static route(comparable) {
        return comparable.subtype === 'bot_message' &&
            comparable.bot_id !== undefined;
    }

    get compareResponse(){
        return this.response.text;
    }
};