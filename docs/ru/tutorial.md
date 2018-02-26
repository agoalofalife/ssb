### Туториал

В этом туториале мы с вами затронем основные моменты для создания бота, и прокомментируем все действия.

!> **Заранее** мы создали приложение, заполнили переменные окружения и создали бота. То есть полностью готовы к работе.

Давайте создадим бота для пиццерии.

Наметим план:
- Бот реагирует в любом канале на призыв : `['Я хочу пиццу', 'Пицца', 'Заказ']` и предлагает интерактивное меню для выбора пиццы.
- Бот предлагает ввести адрес доставки и записывает адрес.
- Команда для просмотра статуса заказа.

Пакет у нас уже установлен, создадим файл `index.js` и инициализируем проект.

```javascript
// index.js
require('dotenv').config();
let token = process.env.SLACK_BOT_TOKEN;
const SlackBot = require('./src/BaseBot');

const bot = new SlackBot({
    token: token,
    name: process.env.SLACK_BOT_NAME,
});

```
 Теперь в любом публичном канале, мы ловем сообщение которые перечисленны выше.
 
 Как только поступает нужное нам событие, мы отправляем интерактивное меню с выбором пицц.
 
В функции `route`, первым аргументом мы передаем наш маршрут это сырое регулярное выражении, можно передавать строку, но тогда должно быть жесткое соответствие.
 
```javascript
let interactivePizzaList = {
 "response_type": "in_channel",
 "attachments": [
     {
         "text": "Какую пиццу вы желаете?",
         "color": "#3AA3E3",
         "attachment_type": "default",
         "callback_id": "pizza_name",
         "actions": [
             {
                 "name": "pizza_list",
                 "text": "Пиццы...",
                 "type": "select",
                 "options": [
                     {
                         "text": "Мясная",
                         "value": "meat"
                     },
                     {
                         "text": "Сырная",
                         "value": "cheese"
                     },
                     {
                         "text": "Пепперони",
                         "value": "pepperoni"
                     },
                     {
                         "text": "Четыре сыра",
                         "value": "four_cheese"
                     },
                 ]
             }
         ]
     }
 ]
};
bot.on('message.groups.pinned_item', (route, routeMention) => {
    route(/Я хочу пиццу|Пицца|Заказ/gi, async function (response, classMessage) {
        await classMessage.reply('Вас приветствует пицца-бот!', interactivePizzaList);
    });
});
```
Выглядит это примерно так:
<img src="/images/pizza-list-ru.jpg">

После того как пицца выбрана, надо записать наш заказ в базу данных и отправить ответ с номером заказа.

!> Этот пример надуман, и не включает такие вещи как кол-во позиции и т.д. Нам ведь просто надо рассмотреть платформу.

База данных избыточно для примера, а просто записывать в файл в самый раз.

Установим репозиторий
```bash
npm i nconf -s
```

```javascript
const nconf = require('nconf');
const path = require('path');
...

const db = nconf.argv().env()
    .file({
        file: path.join(__dirname, 'orders.json')
    });
```
