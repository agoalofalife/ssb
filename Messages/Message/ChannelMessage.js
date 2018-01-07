const FirstLetter = 'C';

module.exports = class ChannelMessage {

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
        return 'message.channels';
    }

    /**
     *
     * @return Regexp
     */
    async patternMention(){
        let id = await this.base.botId();
        return `\<\@${id}\>`;
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

    async isMention() {
        let regexp = await this.patternMention();
        return new RegExp(regexp).test(this.response.text);
    }

    async reply(message, params) {
        let user = await this.base.getUserById(this.response.user);
        if (user.name) {
            return this.base.postMessage(user.name, message, params);
        }
    }
};

