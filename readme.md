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



<a name="Console"></a>
## Console
#### List commands
- server

   Options 
   * start - Start server
   
- show

  Options:   
  * events - A list of all available events
  