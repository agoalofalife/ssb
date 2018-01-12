/**
 *
 * @type {module.Conversation}
 */
module.exports = class Conversation {
    /**
     *
     * @param response
     * @param baseBot class BaseBot
     */
    constructor(response, baseBot){
        this.response = response;
        this.base = baseBot;
    }

    /**
     * @link https://api.slack.com/events/message.im
     * @return {string}
     */
    get typeEvent() {
        return 'conversation';
    }

    get getResponse(){
        return this.response.callback_id;
    }
};