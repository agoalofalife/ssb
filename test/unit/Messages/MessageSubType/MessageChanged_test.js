const MessageChanged = require('./../../../../Messages/MessageSubType/MessageChanged');
const DirectMessage = require('./../../../../Messages/MessageBase/DirectMessage');
const assert = require('assert');
const faker = require('faker');
let  fakeResponseSlack = {
    subtype:'message_changed',
    bot_id:faker.random.uuid(),
    message : {
        text:faker.random.word()
    },
};

describe('MessageChanged', () => {
    it('expected property name event', () => {
        // todo I think these costs add more options
        let directMessage = new DirectMessage();
        assert.equal((new MessageChanged('', '', directMessage)).typeEvent, `${directMessage.typeEvent}.message_changed`);
    });
    it('expected valid description', () => {
        assert.equal((new MessageChanged()).descriptionEvent, 'The event occurs when a message was changed.');
    });
    it('route test method is true', () => {
        assert.equal(MessageChanged.route(fakeResponseSlack), true)
    });
    it('check property responseSlack text', () => {
        assert.equal((new MessageChanged(fakeResponseSlack)).compareResponse, fakeResponseSlack.message.text)
    });
});