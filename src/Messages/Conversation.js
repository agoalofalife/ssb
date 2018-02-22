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

    /**
     * Description event
     * @return {string}
     */
    get descriptionEvent() {
        return 'The event occurs when it was sent interactive message';
    }
    get compareResponse(){
        return this.response.callback_id;
    }

    /**
     * @link https://api.slack.com/slash-commands
     * @return {boolean}
     */
    verify(){
        return process.env.SLACK_VERIFICATION_TOKEN === this.response.token;
    }
};