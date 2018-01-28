const BotMessage = require('./../../../../Messages/MessageSubType/BotMessage');
const DirectMessage = require('./../../../../Messages/MessageBase/DirectMessage');
const assert = require('assert');

// class BaseMessage extends Message{
//
// }
describe('BotMessage', () => {
    it('expected property name event', function () {
        // todo I think these costs add more options
            let directMessage = new DirectMessage();
            assert.equal((new BotMessage('', '', directMessage)).typeEvent, `${directMessage.typeEvent}.bot_message`);
    });
    it('expected valid description', function () {
        assert.equal((new BotMessage()).descriptionEvent, 'The event occurs when a message was sent by a bot in the channel');
    });
});