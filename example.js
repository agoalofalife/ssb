require('dotenv').config();
let token = process.env.SLACK_BOT_TOKEN;
const SlackBot = require('./src/BaseBot');

const bot = new SlackBot({
    token: token,
    name: process.env.SLACK_BOT_NAME,
});

/**
 * auth magic token
 * @link https://slack.com/oauth/authorize?client_id=CLIENT_ID&scope=client+admin&redirect_uri=CALLBACK_URL
 * @help https://github.com/blaskovicz/cut-me-some-slack#creating-a-slack-access-token
 */
let interactiveOptions = {
    "text": "Would you like to play a game?",
    "attachments": [
        {
            "text": "Choose a game to play",
            "fallback": "You are unable to choose a game",
            "callback_id": "welcome_button",
            "color": "#3AA3E3",
            "attachment_type": "default",
            "actions": [
                {
                    "name": "game",
                    "text": "Chess",
                    "type": "button",
                    "value": "chess"
                },
                {
                    "name": "game",
                    "text": "Falken's Maze",
                    "type": "button",
                    "value": "maze"
                },
                {
                    "name": "game",
                    "text": "Thermonuclear War",
                    "style": "danger",
                    "type": "button",
                    "value": "war",
                    "confirm": {
                        "title": "Are you sure?",
                        "text": "Wouldn't you prefer a good game of chess?",
                        "ok_text": "Yes",
                        "dismiss_text": "No"
                    }
                }
            ]
        }
    ]
};
/**
 * this is example
 */
bot.on('message.groups.pinned_item', (route, routeMention) => {
    route(/hello|hi/gi, async function (response, classMessage) {
        let res = await classMessage.reply('Ваше сообщение было архивировано!');
    });

    // routeMention('allo', async function (response, classMessage) {
    //     classMessage.reply('hello', {
    //         icon_emoji: ':piggy:'
    //     });
    // });
});

bot.on('conversation', async (route, response) => {
    // first argument callback_id
    route('like_service', function (responseInitiator, classConversation) {
        response.end('ok');
    });
});

bot.on('command', async (route, response) => {
    route('/time', (responseInitiator, classCommand) => {
        // console.log(responseInitiator);
        console.log(classCommand.base.team.id);
        response.end();
    });
});