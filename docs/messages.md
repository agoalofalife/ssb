## What is messages?

**Messages** in `slack`- this is one of the fundamental concepts.

In stock :
- `(Channels)`
- `(Direct Messages)`
- `(Private Channels)`
- `(Multipart Direct)`

All of these sources received and send messages. It is important to understand, this is the main sources, that is, users only in such "rooms" can communicate with each other.

In the framework are implemented as separate [classes](https://github.com/agoalofalife/ssb/tree/master/src/Messages/MessageBase).

## Messages are divided by type

In addition, messages can come and go from these four sources, each message has its own type.
This means, each message can be the result of and event of any sending.

?> A list of all subtypes of message, see [documentation](https://api.slack.com/events/message) `slack`.

For example, the message can send a bot or the message was noted by someone of the participants.

!> **Attention** All of the subtypes have not yet been implemented by the platform. If you have any need to type, write to [issues](https://github.com/agoalofalife/ssb/issues)
or push PR independently. 


## How to know what are the events??
Of course, to know the full list of events and to keep in mind is impossible.

for this command:
```bash
node bin/app.js show events
```
It displays a list of all available events to the console..

## How it works together?

Indicate only those events that are needed, for example:
- I want to catch the messages that will be sent only to the channel.

```javascript
// the first argument specifies what type of message
bot.on('message.im', (route, routeMention) => {
    ...
});
```

 - I want to catch the messages that will be archived and only the groups.
 
 ```javascript
bot.on('message.groups.channel_archive ', (route, routeMention) => {
     ...
});
 ```
