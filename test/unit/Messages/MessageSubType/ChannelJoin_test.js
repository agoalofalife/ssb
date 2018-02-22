const ChannelJoin = require('../../../../src/Messages/MessageSubType/ChannelJoin');
const DirectMessage = require('../../../../src/Messages/MessageBase/DirectMessage');
const assert = require('assert');
const faker = require('faker');
let  fakeResponseSlack = {
    subtype:'channel_join',
    bot_id:faker.random.uuid(),
    text:faker.random.word()
};

describe('ChannelJoin', () => {
    it('expected property name event', () => {
        // todo I think these costs add more options
        let directMessage = new DirectMessage();
        assert.equal((new ChannelJoin('', '', directMessage)).typeEvent, `${directMessage.typeEvent}.channel_join`);
    });
    it('expected valid description', () => {
        assert.equal((new ChannelJoin()).descriptionEvent, 'The event occurs when a member joined a channel.');
    });
    it('route test method is true', () => {
        assert.equal(ChannelJoin.route(fakeResponseSlack), true)
    });
    it('check property responseSlack text', () => {
        assert.equal((new ChannelJoin(fakeResponseSlack)).compareResponse, fakeResponseSlack.text)
    });
});