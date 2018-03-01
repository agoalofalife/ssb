## Why to create something?

Often requires more than sending a message in`slack`.

Yes, you can just send the message without registration and SMS, it's called [`webhook`](https://api.slack.com/incoming-webhooks).

But for large and flexible bots(and not only) you want to create the [application](https://api.slack.com/slack-apps).

## Okay okay, what to do?

Great! First you need to go to this [link](https://api.slack.com/apps).

If you are authenticated, it is necessary to do it.

After you click on the green button `"Create new App"`.

You have to write :
- **The name of your app**
- **And your chat or `(Workspace)`**
<img src="/images/createapp1.jpg">

Now you need to copy and paste the file `.env` values from your application:

?> The file `.env`  is created through cli.

<img src="/images/createapp2.jpg">

It remains the case for small - to token.

Going into the directory with the project, execute the command:
```bash
ssb server -s
```
The console will start the server to obtain the token..

After that, you need to specify the real address in the network, which will receive the token.

<img src="/images/redirect.jpg">

!> In order to map the local address into the network, is used **[ngrok](https://ngrok.com/)**

To obtain this address, use the command:
```bash
ngrok http 9000
```
The port that is specified at the end, used depending on the environment variable `PORT_SERVER`, by default, is `9000`.

The console will display the address that you want to copy and paste..

Now make open url in browser `https://slack.com/oauth/authorize?client_id=CLIENT_ID&scope=client+admin`.

This can be done manually, or type the command and select the desired browser :
```bash
ssb approve scope
```

?> Please note that `scope` specifies the full rights, if you want to list rights, you can refer to [documentation](https://api.slack.com/docs/oauth).

The browser displays the following.
<img src="/images/authorize.jpg">

After clicking the authorize button, go back to the console, copy `access_token` and in file `.env`, paste `SLACK_BOT_TOKEN`.
That's all you need to do!

You can stop the server and start to implement.

## Create bot

!> **More** information in [documentation](https://api.slack.com/bot-users).

Go to the application page in the section `Bot Users`.

<img src="/images/create-bot.jpg">

Set the name to the bot and switch display mode.

Now, write down the name in the file `.env`, in variable `SLACK_BOT_NAME`.

At the moment, all environment variables must be filled in (The port is not required).