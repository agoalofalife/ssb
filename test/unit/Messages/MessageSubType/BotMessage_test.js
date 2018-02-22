const BotMessage = require('../../../../src/Messages/MessageSubType/BotMessage');
const DirectMessage = require('../../../../src/Messages/MessageBase/DirectMessage');
const assert = require('assert');
const faker = require('faker');
let  fakeResponseSlack = {
    subtype:'bot_message',
    bot_id:faker.random.uuid(),
    text:faker.random.word()
};

describe('BotMessage', () => {
    it('expected property name event', () => {
        // todo I think these costs add more options
            let directMessage = new DirectMessage();
            assert.equal((new BotMessage('', '', directMessage)).typeEvent, `${directMessage.typeEvent}.bot_message`);
    });
    it('expected valid description', () => {
        assert.equal((new BotMessage()).descriptionEvent, 'The event occurs when a message was sent by a bot.');
    });
    it('route test method is true', () => {
        assert.equal(BotMessage.route(fakeResponseSlack), true)
    });
    it('check property responseSlack text', () => {
        assert.equal((new BotMessage(fakeResponseSlack)).compareResponse, fakeResponseSlack.text)
    });
});