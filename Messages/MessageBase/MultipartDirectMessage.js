const Message = require('./Message');

module.exports = class MultipartDirectMessage extends Message{
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
        return 'message.mpim';
    }

    /**
     * Description event
     * @return {string}
     */
    get descriptionEvent() {
        return 'The event occurs when a message arrives in multi direct-group';
    }

    get compareResponse(){
        return this.response.text;
    }

    /**
     * check route
     * @param comparable
     * @param base
     * @return {boolean}
     */
    static async route(comparable, base) {
        try{
            let group = await base.getGroupMultiDirectById(comparable.channel);

            return comparable.type === 'message' &&
                comparable.subtype === undefined &&
                comparable.channel !== undefined && comparable.channel.charAt(0) === this.firstLetter()
                && group !== undefined && group.id === comparable.channel;
        }catch (error){
            return false;
        }
    }
};

