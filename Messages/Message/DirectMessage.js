const FirstLetter = 'D';

module.exports = class DirectMessage {

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
        return 'message.im';
    }
    /**
     * check route
     * @param comparable
     * @return {boolean}
     */
    static route(comparable) {
        return comparable.type === 'message' &&
            comparable.subtype === undefined &&
            comparable.channel !== undefined && comparable.channel.charAt(0) === FirstLetter;
    }

    async replyBack(message, params) {
        let user = await this.base.getUserById(this.response.user);

        if (user.name) {
            return this.base.postMessageToUser(user.name, message, params);
        }
    }
};

