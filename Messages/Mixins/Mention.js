/**
 * Class implementation logic for mention in slack
 * Example @name text
 * @type {module.Mention}
 */
module.exports = class Mention {
    /**
     * Pattern regexp
     * @return {Promise<string>}
     */
    async patternMention(){
        let id = await this.base.botId();
        return `\<\@${id}\>`;
    }

    /**
     * Check in text mention our bot
     * @return {Promise<boolean>}
     */
    async isMention() {
        let regexp = await this.patternMention();
        return new RegExp(regexp).test(this.response.text);
    }
};
