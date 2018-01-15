const assert = require('assert');
const faker = require('faker');
const ChannelMessage = require('./../../../Messages/MessageBase/ChannelMessage');
const Message = require('./../../../Messages/MessageBase/Message');
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
        it('expected Message instanceof', async function() {
            // todo test routes is subjective
            // i think need to increase route elements
            assert.equal(await router(fakeResponse, {}) instanceof Message, true);
        });
    });
});