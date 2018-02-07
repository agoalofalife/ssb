const Message = require('./../MessageBase/Message');
/**
 *
 * @type {module.ChannelJoin}
 */
module.exports = class ChannelJoin extends Message{
    /**
     * @link https://api.slack.com/events/message.im
     * @return {string}
     */
    get typeEvent() {
        return `${this.parent.typeEvent}.channel_join`;
    }

    /**
     * Description event
     * @return {string}
     */
    get descriptionEvent() {
        return 'The event occurs when a member joined a channel.';
    }
    /**
     * check route
     * @param comparable
     * @return {boolean}
     */
    static route(comparable) {
        return comparable.subtype === 'channel_join';
    }

    get compareResponse(){
        return this.response.text;
    }
};