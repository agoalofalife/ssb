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
    /**
     * Description event
     * @return {string}
     */
    get descriptionEvent() {
        return 'The event occurs when was sent a message with the type "command"';
    }

    get compareResponse(){
        return this.response.command;
    }

    /**
     * @link https://api.slack.com/slash-commands
     * @return {boolean}
     */
    verify(){
        return this.base.team.id === this.response.team_id && process.env.SLACK_VERIFICATION_TOKEN === this.response.token;
    }
};