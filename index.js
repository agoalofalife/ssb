require('dotenv').config();
let token = process.env.SLACK_BOT_TOKEN;
const SlackBot = require('./BaseBot');


const bot = new SlackBot({
    token: token,
    name: process.env.SLACK_BOT_NAME,
});


/**
 * help to determine type message
 * @link https://stackoverflow.com/questions/41111227/how-can-a-slack-bot-detect-a-direct-message-vs-a-message-in-a-channel
 */

bot.on('message.groups', async function (classMessage, match) {
    let mention = await classMessage.isMention();
    if (mention && match('hello')) {
        classMessage.reply('hello', {
            icon_emoji: ':piggy:'
        });
    }
});