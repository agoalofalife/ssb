const Message = require('./../MessageBase/Message');
/**
 *
 * @type {module.PinnedItem}
 */
module.exports = class PinnedItem extends Message{
    /**
     * @link https://api.slack.com/events/message.im
     * @return {string}
     */
    get typeEvent() {
        return `${this.parent.typeEvent}.pinned_item`;
    }

    /**
     * Description event
     * @return {string}
     */
    get descriptionEvent() {
        return 'The event occurs when an item was pinned in a channel.';
    }
    /**
     * check route
     * @param comparable
     * @return {boolean}
     */
    static route(comparable) {
        return comparable.subtype === 'pinned_item';
    }

    get compareResponse(){
        return this.response.text;
    }
};