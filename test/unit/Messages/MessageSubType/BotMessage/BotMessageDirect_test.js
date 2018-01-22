const assert = require('assert');
const BotMessageDirect = require('../../../../../Messages/MessageSubType/BotMessage/BotMessageDirect');
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
    channel:`${BotMessageDirect.firstLetter()}${faker.random.number()}`,
    bot_id:faker.random.number()

};

let BotMessageDirectObject = new BotMessageDirect(fakeResponse, SlackBotFake);

describe('BotMessageDirect', function() {
    describe('#typeEvent', function() {
        it('exist property typeEvent and return string type', function() {
            assert.equal(BotMessageDirectObject.typeEvent, 'bot_message.message.im');
        });
    });
    describe('#typeEvent', function() {
        it('exist property typeEvent and return string type', function() {
            assert.equal(BotMessageDirectObject.descriptionEvent, 'The event occurs when a message was sent by a bot in direct(personal)');
        });
    });
    describe('#compareResponse', function() {
        it('get text from response', function() {
            assert.equal(BotMessageDirectObject.compareResponse, fakeResponse.text);
        });
    });

    describe('#route', function() {
        it('route true', function() {
            assert.equal(BotMessageDirect.route(fakeResponse), true);
        });
        it('route some message', function() {
            assert.equal(BotMessageDirect.route(fakeResponse.text = ''), false);
        });
    });
});
