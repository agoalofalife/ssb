const PinnedItem = require('./../../../../Messages/MessageSubType/PinnedItem');
const DirectMessage = require('./../../../../Messages/MessageBase/DirectMessage');
const assert = require('assert');
const faker = require('faker');
let  fakeResponseSlack = {
    subtype:'pinned_item',
    bot_id:faker.random.uuid(),
    message : {
        text:faker.random.word()
    },
};

describe('PinnedItem', () => {
    it('expected property name event', () => {
        // todo I think these costs add more options
        let directMessage = new DirectMessage();
        assert.equal((new PinnedItem('', '', directMessage)).typeEvent, `${directMessage.typeEvent}.pinned_item`);
    });
    it('expected valid description', () => {
        assert.equal((new PinnedItem()).descriptionEvent, 'The event occurs when an item was pinned in a channel.');
    });
    it('route test method is true', () => {
        assert.equal(PinnedItem.route(fakeResponseSlack), true)
    });
    it('check property responseSlack text', () => {
        assert.equal((new PinnedItem(fakeResponseSlack)).compareResponse, fakeResponseSlack.text)
    });
});