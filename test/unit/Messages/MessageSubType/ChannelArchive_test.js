const ChannelArchive = require('./../../../../Messages/MessageSubType/ChannelArchive');
const DirectMessage = require('./../../../../Messages/MessageBase/DirectMessage');
const assert = require('assert');
const faker = require('faker');
let  fakeResponseSlack = {
    subtype:'channel_archive',
    bot_id:faker.random.uuid(),
    text:faker.random.word()
};

describe('ChannelArchive', () => {
    it('expected property name event', () => {
        // todo I think these costs add more options
        let directMessage = new DirectMessage();
        assert.equal((new ChannelArchive('', '', directMessage)).typeEvent, `${directMessage.typeEvent}.channel_archive`);
    });
    it('expected valid description', () => {
        assert.equal((new ChannelArchive()).descriptionEvent, 'The event occurs when a channel was archived.');
    });
    it('route test method is true', () => {
        assert.equal(ChannelArchive.route(fakeResponseSlack), true)
    });
    it('check property responseSlack text', () => {
        assert.equal((new ChannelArchive(fakeResponseSlack)).compareResponse, fakeResponseSlack.text)
    });
});