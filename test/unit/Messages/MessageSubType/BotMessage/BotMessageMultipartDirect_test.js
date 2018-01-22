const assert = require('assert');
const BotMessageMultipartDirect = require('../../../../../Messages/MessageSubType/BotMessage/BotMessageMultipartDirect');
const faker = require('faker');

let randomFaker = faker.random.uuid();
let fakeResponse = {
    user:faker.name.firstName,
    type:'message',
    subtype:'bot_message',
    text:faker.lorem.text(),
    channel:`${BotMessageMultipartDirect.firstLetter()}${faker.random.number()}`,
    bot_id:faker.random.number()
};
let SlackBotFake = {
    getGroupMultiDirectById: (channel) => {
        return new Promise((resolve, reject) => {
            if (channel === fakeResponse.channel) {
                resolve({id:fakeResponse.channel});
            } else{
                reject();
            }

        });

    },
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



let BotMessageMultipartDirectObject = new BotMessageMultipartDirect(fakeResponse, SlackBotFake);

describe('BotMessageDirect', function() {
    describe('#typeEvent', function() {
        it('exist property typeEvent and return string type', function() {
            assert.equal(BotMessageMultipartDirectObject.typeEvent, 'bot_message.message.mpim');
        });
    });
    describe('#typeEvent', function() {
        it('exist property typeEvent and return string type', function() {
            assert.equal(BotMessageMultipartDirectObject.descriptionEvent, 'The event occurs when a message was sent by a bot in multi direct-group');
        });
    });
    describe('#compareResponse', function() {
        it('get text from response', function() {
            assert.equal(BotMessageMultipartDirectObject.compareResponse, fakeResponse.text);
        });
    });

    describe('#route', function() {
        it('route true', async function() {
            assert.equal(await BotMessageMultipartDirect.route(fakeResponse, SlackBotFake), true);
        });
        it('route some message when exception', async function() {
            assert.equal(await BotMessageMultipartDirect.route(fakeResponse.text = '', SlackBotFake), false);
        });
    });
});
