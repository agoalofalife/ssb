const MultipartDirectMessage = require('../../MessageBase/MultipartDirectMessage');

module.exports = class BotMessageMultipartDirect extends MultipartDirectMessage {

    /**
     * @link https://api.slack.com/events/message.im
     * @return {string}
     */
    get typeEvent() {
        return 'bot_message.message.mpim';
    }
    /**
     * Description event
     * @return {string}
     */
    get descriptionEvent() {
        return 'The event occurs when a message was sent by a bot in multi direct-group';
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
                comparable.subtype === 'bot_message' &&
                comparable.channel !== undefined &&
                comparable.channel.charAt(0) === this.firstLetter() &&
                comparable.bot_id !== undefined && group !== undefined &&
                group.id === comparable.channel;
        }catch (error){
            // console.log( error );
            return false;
        }

    }

    get compareResponse(){
        return this.response.text;
    }
};

