

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
        this.user = this.base.getUserById(response.user);
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
        return comparable.subtype === undefined && comparable.channel !== undefined && comparable.channel.charAt(0) === FirstLetter;
    }


};

