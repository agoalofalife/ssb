<h1 align="center">(SSB) Super Slack Bot</h1>

<p align="center">
 <a href="https://travis-ci.org/agoalofalife/ssb">
 <img src="https://travis-ci.org/agoalofalife/ssb.svg?branch=master"></a>
 <a href="https://codecov.io/gh/agoalofalife/ssb">
   <img src="https://codecov.io/gh/agoalofalife/ssb/branch/master/graph/badge.svg" />
 </a>
 </p>


Short description :
....


- [Requirement](#Requirement)
- [Message](#Message)
- [Conversation or Interactive](#Conversation_or_Interactive)
- [Slash Commands](#Slash_Commands)
- [Console](#Console)

<a name="Requirement"></a>
## Requirement
```text
Node js version 9.3.0
```

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
   