const Message = require('./../MessageBase/Message');
/**
 *
 * @type {module.ChannelArchive}
 */
module.exports = class ChannelArchive extends Message{
    /**
     * @link https://api.slack.com/events/message.im
     * @return {string}
     */
    get typeEvent() {
        return `${this.parent.typeEvent}.channel_archive`;
    }

    /**
     * Description event
     * @return {string}
     */
    get descriptionEvent() {
        return 'The event occurs when a channel was archived.';
    }
    /**
     * check route
     * @param comparable
     * @return {boolean}
     */
    static route(comparable) {
        return comparable.subtype === 'channel_archive';
    }

    get compareResponse(){
        return this.response.text;
    }
};