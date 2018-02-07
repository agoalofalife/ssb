const Message = require('./Message');

module.exports = class PrivateChannelMessage extends Message{
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
        return 'message.groups';
    }

    /**
     * Description event
     * @return {string}
     */
    get descriptionEvent() {
        return 'The event occurs when a message arrives in private channel';
    }

    get compareResponse(){
        return this.response.text;
    }

    /**
     * check route
     * @param comparable
     * @param base SlackBot class
     * @return {boolean}
     */
    static async route(comparable, base) {
        try{
            let group = await base.getGroupPrivateChannelById(comparable.channel);

            return comparable.type === 'message' &&
                comparable.channel !== undefined && comparable.channel.charAt(0) === this.firstLetter()
                && group !== undefined && group.id === comparable.channel;
        }catch (error){
            return false;
        }
    }
};

