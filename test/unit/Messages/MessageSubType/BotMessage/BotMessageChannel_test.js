const assert = require('assert');
const BotMessageChannel = require('../../../../../Messages/MessageSubType/BotMessage/BotMessageChannel');
const faker = require('faker');

let randomFaker = faker.random.uuid();
let SlackBotFake = {
    getUserById: (responseUser) => {
        return new Promise((resolve, reject) => {
            if (responseUser === fakeResponse.user) {
                resolve({name:faker.name.firstName()});
            } else{
                reject();
            }

        });

    },
    postMessage: () => {
        return randomFaker;
    }
};

let fakeResponse = {
    user:faker.name.firstName,
    type:'message',
    subtype:'bot_message',
    text:faker.lorem.text(),
    channel:`${BotMessageChannel.firstLetter()}${faker.random.number()}`,
    bot_id:faker.random.number()

};

let BotMessageChannelObject = new BotMessageChannel(fakeResponse, SlackBotFake);

describe('BotMessageChannel', function() {
    describe('#typeEvent', function() {
        it('exist property typeEvent and return string type', function() {
            assert.equal(BotMessageChannelObject.typeEvent, 'bot_message.message.channels');
        });
    });
    describe('#typeEvent', function() {
        it('exist property typeEvent and return string type', function() {
            assert.equal(BotMessageChannelObject.descriptionEvent, 'The event occurs when a message was sent by a bot in the channel');
        });
    });
    describe('#compareResponse', function() {
        it('get text from response', function() {
            assert.equal(BotMessageChannelObject.compareResponse, fakeResponse.text);
        });
    });

    describe('#route', function() {
        it('route true', function() {
            assert.equal(BotMessageChannel.route(fakeResponse), true);
        });
        it('route some message', function() {
            assert.equal(BotMessageChannel.route(fakeResponse.text = ''), false);
        });
    });
});
