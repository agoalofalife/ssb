const MultipartDirectMessage = require('../../MessageBase/MultipartDirectMessage');

module.exports = class MessageChangedMultipartDirect extends MultipartDirectMessage {

    /**
     * @link https://api.slack.com/events/message.im
     * @return {string}
     */
    get typeEvent() {
        return 'message_changed.message.mpim';
    }
    /**
     * Description event
     * @return {string}
     */
    get descriptionEvent() {
        return 'The event occurs when a message was changed in multi direct-group';
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

