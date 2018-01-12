const assert = require('assert');
const faker = require('faker');
const ChannelMessage = require('./../../../Messages/MessageBase/ChannelMessage');
const {router} = require('./../../../route/routes');

let fakeResponse = {
    user:faker.name.firstName,
    type:'message',
    message:{
        text:faker.lorem.text(),
    },
    channel:`${ChannelMessage.firstLetter()}${faker.random.number()}`,

};
describe('routes', function() {
    describe('#routes', function() {
        it('expected ChannelMessage object', function() {
            assert.equal(router(fakeResponse, {}).constructor.name === ChannelMessage.name, true);
        });
    });
});