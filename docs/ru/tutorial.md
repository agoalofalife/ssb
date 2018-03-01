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
 Теперь в любом публичном канале, мы ловим сообщение которые перечисленны выше.
 
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
bot.on('message.channels', (route, routeMention) => {
    route(/Я хочу пиццу|Пицца|Заказ/gi, async function (response, classMessage) {
        await classMessage.reply('Вас приветствует пицца-бот!', interactivePizzaList);
    });
});
```
Выглядит это примерно так:
<img src="./images/pizza-list-ru.jpg">

После того как пицца выбрана, надо записать наш заказ в базу данных и отправить ответ с номером заказа.

!> Этот пример надуман, и не включает такие вещи как кол-во позиции и т.д. Нам ведь просто надо рассмотреть платформу.

База данных избыточно для примера, а просто записывать в файл в самый раз.

Установим репозиторий для записи в файл.
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

Теперь нам надо ловить взаимодействие с нашим меню.

Мы будем записывать, кто сделал заказ, что заказал, и дату когда должна произойти доставка.

Для этого используется библиотека `moment.js`.

```javascript
bot.on('conversation', async (route, response) => {
    route('pizza_name', async function (responseInitiator, classConversation) {
        // генерация номера заказа
        let numberOrder = Math.floor(Math.random() * (100000 - 1)) + 1;
        // пользователь
        // какая пицца
        // дата доставки
        db.set(`${numberOrder}`, {
            'user_id' : responseInitiator.user.id,
            'pizza' : responseInitiator.actions.shift().selected_options.shift().value,
            'delivery date': moment().add(40, 'minute'),
        });
        db.save();
        response.end(`Ваш номер заказа ${numberOrder}. Доставка через 40 минут` );
    });
});
```
Добавление команды, для информации по заказу.
Зайдем в наше приложении и добавим команду: `info-order`.

```javascript
bot.on('command', async (route, response) => {
    route('/info-order', (responseInitiator, classCommand) => {
     
        let order = db.stores.file.store[responseInitiator.text];
        let message = '';
        // Если заказ найден
        if (order !== undefined) {
            message += 'Вы заказали ' + order.pizza ;
            // Проверям дату достаки
           // Текст в зависимости от даты
            let diff = moment().diff('2018-02-26T14:49:57.076Z', 'minute');
            if (diff <= 0) {
                message += '. Ваш заказ будет через ' + Number(Math.abs(diff)) + ' минут.'
            } else {
                message += '. Ваш заказ уже привезли.'
            }
            response.json({
                'text':message
            });
        }
        response.json({
            'text':'Заказ не найден'
        });
    });
});
```

Как видите мы добавили команду, которая принимает номер заказа и ищет его в файле.
Если он найден отображает справочную информацию о его судьбе, иначе заказ не найден.

### Рекомендации

В таком маленком приложении как это, все можно расположить в одном файле.

Но рекомендуется разделить все по соответствущем папкам.
Например создать папку `routes/react`, где будут складироваться реакции.

```javascript
// routes.js
bot.on('message.channels', (route, routeMention) => {
    route(/Я хочу пиццу|Пицца|Заказ/gi, PizzaController.order);
});
```
Под сохранение выделить папку с `models`.

Можно отдельно создать файлы-роуты с `conversation` и `command`.

Старайтесь больше думать и удачи.