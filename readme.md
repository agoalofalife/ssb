<h1 align="center">(SSB) Super Slack Bot</h1>

<p align="center">
 <a href="https://travis-ci.org/agoalofalife/ssb">
 <img src="https://travis-ci.org/agoalofalife/ssb.svg?branch=master"></a>
 <a href="https://codecov.io/gh/agoalofalife/ssb">
   <img src="https://codecov.io/gh/agoalofalife/ssb/branch/master/graph/badge.svg" />
 </a>
 </p>


### Short description :
The basic idea of the platform, to create a complete tool to work with bots in the environment slack.

Usually we do not want to disassemble authentication, application architecture and implementation for various protocols.

We just want to add configuration and quick to develop, so go ahead!


- [Requirement](#Requirement)
- [Installation](#Installation)
- [Environment variables](#Environment_variables)
- [Message](#Message)
- [Conversation or Interactive](#Conversation_or_Interactive)
- [Slash Commands](#Slash_Commands)
- [Console](#Console)
- [Tutorial on the use](#Tutorial_on_the_use)

<a name="Requirement"></a>
## Requirement
```text
Node js version 9.3.0
The app is under development(WIP)
```

<a name="Installation"></a>
## Installation

```text
npm install super-slack-bot
```


<a name="Environment_variables"></a>
## Environment variables
In the spirit [The Twelve-Factor App](https://12factor.net) all changing the configuration are set via environment variables.  

You need create file `.env` in your directory and add variables.

#### List variables

| Variable name            | Description                                                                            |
|--------------------------|----------------------------------------------------------------------------------------|
| SLACK_CLIENT_ID          | you can find inside of your application under "Basic Information" -> "App Credentials" |
| SLACK_CLIENT_SECRET      | you can find inside of your application under "Basic Information" -> "App Credentials" |
| SLACK_BOT_TOKEN          | Token you can get a temporary or passing authentication                                |
| SLACK_BOT_NAME           | you can find inside of your application under "Bot User"                               |
| SLACK_VERIFICATION_TOKEN | you can find inside of your application under "Basic Information" -> "App Credentials" |
| PORT_SERVER              | PORT server for conversation and command                                               |


<a name="Message"></a>
## Message

Message is of the basic concepts.
There are 4 main types:
- `message.channels` - for messages appearing within channels
- `message.im`  - for messages appearing within direct messages
- `message.groups` - for messages appearing within private channels
- `message.mpim` - for messages appearing within multiparty direct messages


[more can be read here](https://api.slack.com/events/message.im)

Those are 4 basic concepts, they are inherited from all other subtypes.

<a name="Conversation_or_Interactive"></a>
## Conversation or Interactive
In [documentation](https://api.slack.com/interactive-messages) you can read more.

Short, interactive messages differ from ordinary messages.

Interaction to push data in other url, which will choose in your app.

It doesn't work with web-socket, but for you it will not be quite noticeable.

##### Specify url
 
 - You must go to your app 
 - Next step : Features -> Interactive Components
 - Insert your url
 
 Example `https://url/conversation`
 
 <img src="http://dl4.joxi.net/drive/2018/01/13/0017/1804/1177356/56/e672fa7241.jpg">
 
   Note: For testing you can use [ngrok](https://ngrok.com/).
   
   He is create secure tunnel for your localhost.
    
```javascript
// listen event 'conversation'
// in route we need to pass 'callback_id'
bot.on('conversation', async (route, response) => {
    // responseInitiator json which is refundable after the reaction
    route('welcome_button', function (responseInitiator, classConversation) {
        response.end('ok');
    });
});
```    
<a name="Slash_Commands"></a>
## Slash Commands
[Read more](https://api.slack.com/slash-commands)

Commands are very similar to conversation.

They have separete url and not working with web-socket.
##### Specify url
 
 - You must go to your app 
 - Next step : Features -> Slash Commands
 - Create new command and insert your url with prefix `/commands`
 
 <img src="http://dl3.joxi.net/drive/2018/01/13/0017/1804/1177356/56/cc4b230b47.jpg">
 
 When a request comes in, it checks team_id and token verification, if not checked return response code `401`.
 
```javascript
// listen event 'command'
bot.on('command', async (route, response) => {
    route('/start', (responseInitiator, classCommand) => {
        response.end();
    });
});
```
<a name="Console"></a>
## Console
#### List commands
- server

   Options 
   * start - Start server
   
- show

  Options:   
  * events - A list of all available events
  
  <p align="center"><img src="http://dl4.joxi.net/drive/2018/01/13/0017/1804/1177356/56/d5d1e58875.jpg"></p>
   

<a name="Tutorial_on_the_use"></a>
## Tutorial on the use

##### Start 
```javascript
// include env variables
require('dotenv').config();
// require package
const SlackBot = require('./BaseBot');
// pass name and token bot
const bot = new SlackBot({
    token: process.env.SLACK_BOT_TOKEN,
    name: process.env.SLACK_BOT_NAME,
});
```
##### Listen event 

```javascript
// first argument pass type event 
// list event you can watch using the command : show events

// second callback where two arguments:
// - object Route for match regexp or string
// - object Route for match regexp or string if the message mentioned our bot

bot.on('message.channels', (route, routeMention) => {
    // route can take type Regexp and type String
    // if type string then expected full match
    route(/hello|hi/gi, async function (response, classMessage) {
        // reply - it means sending in response
        let res = await classMessage.reply('hello friend!');
    });

     routeMention('hello', async function (response, classMessage) {
         // the message will be visible only to the sender
         classMessage.replyEphemeral('hello', {
             icon_emoji: ':piggy:'
         });
     });
});
```