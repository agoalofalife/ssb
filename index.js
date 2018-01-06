require('dotenv').config();
let token = process.env.SLACK_BOT_TOKEN;
const SlackBot = require('./BaseBot');
const help = require('./helper');

const bot = new SlackBot({
    token: token,
    name: process.env.SLACK_BOT_NAME,
});


/**
 * help to determine type message
 * @link https://stackoverflow.com/questions/41111227/how-can-a-slack-bot-detect-a-direct-message-vs-a-message-in-a-channel
 */

var params = {
    icon_emoji: ':piggy:'
};

bot.on('start', function(data) {});

bot.on('message.im', async function (classMessage) {
    console.log(classMessage.response)
    // this.getUserById(message.user)
});

// bot.on('message', async function(data) {
//     // console.log(data,'????');
//
//    if (data.type === 'message' && help.isBot(data) === false) {
//
//        // await bot.postMessageToUser('agoalofalife', 'hi', params);
//        //  let channel = await bot.getChannelById(data.channel);
//        // let channels = await bot.getChannels();
//        //  console.log(channels)
//         // console.log(user, 'user')
//    }
// });