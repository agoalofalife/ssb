const assert = require('assert');
const MessageChangedPrivate = require('../../../../../Messages/MessageSubType/MessageChanged/MessageChangedPrivate');
const faker = require('faker');

let randomFaker = faker.random.uuid();
let SlackBotFake = {
    getGroupPrivateChannelById: (channel) => {
        return new Promise((resolve, reject) => {
            if (channel === fakeResponse.channel) {
                resolve({id:fakeResponse.channel});
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
    subtype:'message_changed',
    message:{
        text:faker.lorem.text(),
    },
    channel:`${MessageChangedPrivate.firstLetter()}${faker.random.number()}`,

};

let MessageChangedPrivateObject = new MessageChangedPrivate(fakeResponse, SlackBotFake);

describe('MessageChangedPrivate', function() {
    describe('#typeEvent', function() {
        it('exist property typeEvent and return string type', function() {
            assert.equal(MessageChangedPrivateObject.typeEvent, 'message_changed.message.groups');
        });
    });
    describe('#typeEvent', function() {
        it('exist property typeEvent and return string type', function() {
            assert.equal(MessageChangedPrivateObject.descriptionEvent, 'The event occurs when a message was changed in private channel');
        });
    });
    describe('#compareResponse', function() {
        it('get text from response', function() {
            assert.equal(MessageChangedPrivateObject.compareResponse, fakeResponse.message.text);
        });
    });

    describe('#route', function() {
        it('route true', async function() {
            assert.equal(await MessageChangedPrivate.route(fakeResponse, SlackBotFake), true);
        });
        it('route some message', async function() {
            assert.equal(await MessageChangedPrivate.route(fakeResponse.channel = '', SlackBotFake), false);
        });
    });
});
