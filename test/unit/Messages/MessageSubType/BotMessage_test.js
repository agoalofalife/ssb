const BotMessage = require('./../../../../Messages/MessageSubType/BotMessage');
const assert = require('assert');

describe('BotMessage', () => {
    it('expected property name event', function () {
            assert.equal((new BotMessage()).typeEvent, 'bot_message');
    });
    it('expected valid description', function () {
        assert.equal((new BotMessage()).descriptionEvent, 'The event occurs when a message was sent by a bot in the channel');
    });
});