/**
 * Check bot
 * @param data from request
 * @return {*|boolean} true or false
 */
function isBot(data) {
    return Boolean(data.subtype) && Boolean(data.subtype === 'bot_message');
}

module.exports = {
    isBot : isBot,
};