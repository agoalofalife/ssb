## What is SSB ?
SSB - stands for Super Slack Bot.

It is a platform to create applications and bots for [`slack`](https://slack.com/).

It is encapsulates all the nuances and offers flexible tools for the job.

Create a bot in slack is fast and fun!

## Requirements

!> **Node js** version not less than 9.3.0

## Install 
To install you need to run the command:

```bash
npm install super-slack-bot
```

## CLI
To use a command-line utility `SSB` , you should add the entry in `.bashrc` or `.bash_profile` depending on OS.
 ```text
export PATH="$PATH:./node_modules/.bin"
```

After run the command:

```bash
source ~/.bash_profile
```
```bash
ssb
```

In the terminal should appear :
```wiki
Usage: ssb [options] [command]

  To create something


  Options:

    -V, --version  output the version number
    -V, --version  output the version number
    -h, --help     output usage information


  Commands:

    server [options]
    create <what>
    show <what>       Show information

```

Run in the console working directory:

```bash
ssb create env
```

It will create a file with environment variables for further work.