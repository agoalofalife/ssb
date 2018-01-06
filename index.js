require('dotenv').config();
let token = process.env.SLACK_BOT_TOKEN;
const SlackBot = require('slackbots');
const help = require('./helper');

const bot = new SlackBot({
    token: token,
    name: 'aleksey'
});
var params = {
    icon_emoji: ':piggy:'
};

bot.on('start', function(data) {
});

bot.on('message', async function(data) {
    // console.log(data,'????');

   if (data.type === 'message' && help.isBot(data) === false) {

       // await bot.postMessageToUser('agoalofalife', 'hi', params);
       //  let channel = await bot.getChannelById(data.channel);
       // let channels = await bot.getChannels();
       //  console.log(channels)
        // console.log(user, 'user')
   }
});