const Message = require('./../MessageBase/Message');
/**
 *
 * @type {module.MessageChanged}
 */
module.exports = class MessageChanged extends Message{
    /**
     * @link https://api.slack.com/events/message.im
     * @return {string}
     */
    get typeEvent() {
        return `${this.parent.typeEvent}.message_changed`;
    }

    /**
     * Description event
     * @return {string}
     */
    get descriptionEvent() {
        return 'The event occurs when a message was changed.';
    }
    /**
     * check route
     * @param comparable
     * @return {boolean}
     */
    static route(comparable) {
        return comparable.subtype === 'message_changed';
    }

    get compareResponse(){
        return this.response.text;
    }
};