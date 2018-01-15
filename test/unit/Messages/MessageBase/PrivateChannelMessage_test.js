const assert = require('assert');
const PrivateChannelMessage = require('./../../../../Messages/MessageBase/PrivateChannelMessage');
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
    channel:`${PrivateChannelMessage.firstLetter()}${faker.random.number()}`,

};

let PrivateChannelMessageObject = new PrivateChannelMessage(fakeResponse, SlackBotFake);

describe('PrivateChannelMessage', function() {
    describe('#typeEvent', function() {
        it('exist property typeEvent and return string type', function() {
            assert.deepEqual(PrivateChannelMessageObject.typeEvent, 'message.groups');
        });
    });
    describe('#descriptionEvent', function() {
        it('equal description', function() {
            assert.equal(PrivateChannelMessageObject.descriptionEvent, 'The event occurs when a message arrives in private channel');
        });
    });

    describe('#firstLetter', function() {
        it('exist method firstLetter and return string letter `G`', function() {
            assert.equal(PrivateChannelMessage.firstLetter(), 'G');
        });
    });
    describe('#compareResponse', function() {
        it('get text from response', function() {
            assert.equal(PrivateChannelMessageObject.compareResponse, fakeResponse.text);
        });
    });
    describe('#route', function() {
        it('route true', async function() {
            assert.equal(await PrivateChannelMessage.route(fakeResponse), false);
        });
        it('route some message', async function() {
            assert.equal(await PrivateChannelMessage.route(fakeResponse.message = ''), false);
        });
    });
});
