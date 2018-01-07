<h1 align="center">Slack Bot</h1>

<p align="center">
 <a href="https://travis-ci.org/agoalofalife/slack-bot-loftschool-nodejs">
 <img src="https://travis-ci.org/agoalofalife/slack-bot-loftschool-nodejs.svg?branch=master"></a>
 </p>


Short description :
....



- [Message](#Message)



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

