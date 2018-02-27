## Что такое интерактив?

?> _Прочитать_ больше в [оф. документации](https://api.slack.com/docs/message-buttons)

Это не просто текстовые сообщения.

Это могут быть:
- Кнопки
- Меню
- Чекбоксы и другое

Взаимодействие с этим `'интерактивом'`, порождает отдельные `https` запросы на ваш сервер.

## Конфигурация

Адрес сервера указывается в вашем приложении.

- В первом полем заполняется адрес, куда будут поступать `https` запросы.

- Вторым полем является адрес для динамического меню. То есть, если изначально не известен перечень меню, можно его получить с помощью запроса. Пока его опустим.


<img src="/images/create-interactive.jpg">

!> **Обратите внимание**, что после имени хоста, написан префикс `conversation`. Он обязателен.

## Взаимодействие в коде

Чтобы пользователь начал взаимодействие, нужно опубликовать созданный интерактив.

Допустим отправим `'интерактив'` после получения сообщения из чата.

```javascript
require('dotenv').config();
let token = process.env.SLACK_BOT_TOKEN;
const SlackBot = require('super-slack-bot');

const bot = new SlackBot({
    token: token,
    name: process.env.SLACK_BOT_NAME,
});

let interactiveOptions = {
    "attachments": [
        {
            "text": "Нравится ли вам наши услуги?",
            "fallback": "Выбирете один из вариантов ответа",
            "callback_id": "like_service",
            "color": "#3AA3E3",
            "attachment_type": "default",
            "actions": [
                {
                    "name": "quality",
                    "text": "Да, вы супер!",
                    "type": "button",
                    "value": "like"
                },
                {
                    "name": "quality",
                    "text": "Неееее",
                    "type": "button",
                    "value": "dislike"
                }
            ]
        }
    ]
};

bot.on('message.im', (route, routeMention) => {
    route(/Я хочу интерактив!/gi, async function (response, classMessage) {
      await classMessage.reply('Внимание интерактив!', interactiveOptions);
    });
});
```

<img src="/images/interactive-start.jpg">

После отправки сообщения появятся две кнопки, где нужно сделать выбор. Именно нажатие по этим кнопкам отправит запрос на сервер.


```javascript
// listen event 'conversation'
// in route we need to pass 'callback_id'
bot.on('conversation', async (route, response) => {
    // first argument callback_id
    route('like_service', function (responseInitiator, classConversation) {
      response.end('Спасибо за отзыв!');
    });
});
```
Обработка как в разделе с `commands`.
- В `route` указать `callback_id`.
- Ответ через `response`.