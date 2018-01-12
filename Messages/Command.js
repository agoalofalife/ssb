/**
 *
 * @type {module.Command}
 */
module.exports = class Command {
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
        return 'command';
    }

    get getResponse(){
        return this.response.command;
    }
};