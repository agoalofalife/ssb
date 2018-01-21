const PrivateChannelMessage = require('../../MessageBase/PrivateChannelMessage');

module.exports = class MessageChangedPrivate extends PrivateChannelMessage {

    /**
     * @link https://api.slack.com/events/message.im
     * @return {string}
     */
    get typeEvent() {
        return 'message_changed.message.groups';
    }
    /**
     * Description event
     * @return {string}
     */
    get descriptionEvent() {
        return 'The event occurs when a message was changed in private channel';
    }
    /**
     * check route
     * @param comparable
     * @param base
     * @return {boolean}
     */
    static async route(comparable, base) {
        try{
            let group = await base.getGroupPrivateChannelById(comparable.channel);

            return comparable.type === 'message' &&
                comparable.subtype === 'message_changed' &&
                comparable.channel !== undefined && comparable.channel.charAt(0) === this.firstLetter()
                && group !== undefined && group.id === comparable.channel;
        }catch (error){
            return false;
        }
    }

    get compareResponse(){
        return this.response.message.text;
    }
};

