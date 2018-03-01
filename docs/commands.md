## What is `command`?

Command something similar to [CLI](https://ru.wikipedia.org/wiki/%D0%98%D0%BD%D1%82%D0%B5%D1%80%D1%84%D0%B5%D0%B9%D1%81_%D0%BA%D0%BE%D0%BC%D0%B0%D0%BD%D0%B4%D0%BD%D0%BE%D0%B9_%D1%81%D1%82%D1%80%D0%BE%D0%BA%D0%B8) application, only for `slack`- chat.

?> You can always read more [documentation](https://api.slack.com/slash-commands).

Let's say you want to isolate some action..

Example, in `slack` there are built-in commands as:
- `/topic` change theme in `channel`.
- `/remind` a reminder after a certain period of time.

When you type the command in `slack`, is sent to the server `HTTPS` request, this will be a call to action.

Create a team via the app.


## Create command

Go to the app and press the button to create a **command**.

<img src="/images/create-command.jpg">

Next you need to fill in the required fields:
- Your command name.
- The address of the network, where will come `https` request. In this case, not real server, moving to the network via `ngrok`.
- Description

!> **Please note** to delineate the area of queries, after the host is added as a prefix `/commands`.
Example `https://host.com/commands`.

<img src="/images/command-create-prew.jpg">

After creating the teams, to the address which we have pointed out, will come the queries.

Consider how to handle the **commands**.

You need to write about the following:

```javascript
// listen event 'command'
bot.on('command', async (route, response) => {
    route('/time', (responseInitiator, classCommand) => {
        response.json({
            "text": "Time is " + (new Date).toLocaleString(),
        });
    });
});
```

This is very similar to a regular message, except that:
- The event name is `command`.
- In `route` specify the name of your command.
- The answer is through the object `response`.

This scheme works well, when it is possible to produce a response within 3 seconds.

In the case, when the operation takes more time, you should use the parameter `response_url`.

Somewhere to save it, and send within half an hour.

