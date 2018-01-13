/**
 *
 * @type {module.Message}
 */
module.exports = class Message {
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
     * to send in response
     * @param message
     * @param params
     * @return {Promise<*>}
     */
    async reply(message, params) {
        if (this.response.channel) {
            return await this.base.postMessage(this.response.channel, message, params);
        }
    }

    /**
     * Post reply only the one who sent
     * @link https://api.slack.com/methods/chat.postEphemeral
     * @param message
     * @param params
     * @return {Promise<vow.Promise>}
     */
    async replyEphemeral(message, params) {
        if (this.response.channel && this.response.user) {
            return await this.base.postEphemeral(this.response.channel, this.response.user,  message, params);
        }
    }
}