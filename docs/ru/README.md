## Требования

!> **Node js** версия не менее 9.3.0

## Установка 
Для установки вам необходимо выполнить команду:

```bash
npm install super-slack-bot
```

## CLI
Чтобы пользоваться консольной утилитой `SSB` вам надо добавить запись в `.bashrc` или `.bash_profile` в зависимости от вашей OS.
 ```text
export PATH="$PATH:./node_modules/.bin"
```

После выполнить команду:

```bash
source ~/.bash_profile
```
```bash
ssb
```
Вы должны увидеть в терминале :
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