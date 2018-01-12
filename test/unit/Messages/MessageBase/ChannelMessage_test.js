const assert = require('assert');
const ChannelMessage = require('./../../../../Messages/MessageBase/ChannelMessage');
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
    text:faker.lorem.text(),
    channel:`${ChannelMessage.firstLetter()}${faker.random.number()}`,

};

let ChannelMessageObject = new ChannelMessage(fakeResponse, SlackBotFake);

describe('ChannelMessage', function() {
    describe('#firstLetter', function() {
        it('exist method firstLetter and return string letter `C`', function() {
            assert.equal(ChannelMessage.firstLetter(), 'C');
        });
    });
    describe('#typeEvent', function() {
        it('exist property typeEvent and return string type', function() {
            assert.equal(ChannelMessageObject.typeEvent, 'message.channels');
        });
    });
    describe('#descriptionEvent', function() {
        it('equal description', function() {
            assert.equal(ChannelMessageObject.descriptionEvent, 'The event occurs when a message arrives in channel');
        });
    });

    describe('#getResponse', function() {
        it('get text from response', function() {
            assert.equal(ChannelMessageObject.getResponse, fakeResponse.text);
        });
    });
    describe('#route', function() {
        it('route true', function() {
            assert.equal(ChannelMessage.route(fakeResponse), true);
        });
        it('route some message', function() {
            assert.equal(ChannelMessage.route(fakeResponse.message = ''), false);
        });
    });
    describe('#reply', function() {
        it('reply', async function() {
            let result = await ChannelMessageObject.reply(faker.lorem.word(), {});
            assert.equal(result, randomFaker);
        });
    });
    describe('#patternMention', function() {
        it('exist function', function() {
            assert.equal(typeof  ChannelMessageObject.patternMention === 'function', true);
        });
    });
    describe('#isMention', function() {
        it('exist function', function() {
            assert.equal(typeof  ChannelMessageObject.isMention === 'function', true);
        });
    });
});
