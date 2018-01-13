const assert = require('assert');
const MessageChangedChannel = require('../../../../../Messages/MessageSubType/MessageChanged/MessageChangedChannel');
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
    subtype:'message_changed',
    message:{
        text:faker.lorem.text(),
    },
    channel:`${MessageChangedChannel.firstLetter()}${faker.random.number()}`,

};

let MessageChangedChannelObject = new MessageChangedChannel(fakeResponse, SlackBotFake);

describe('MessageChangedChannel', function() {
    describe('#typeEvent', function() {
        it('exist property typeEvent and return string type', function() {
            assert.equal(MessageChangedChannelObject.typeEvent, 'message_changed.message.channels');
        });
    });
    describe('#typeEvent', function() {
        it('exist property typeEvent and return string type', function() {
            assert.equal(MessageChangedChannelObject.descriptionEvent, 'The event occurs when a message was changed in channel');
        });
    });
    describe('#compareResponse', function() {
        it('get text from response', function() {
            assert.equal(MessageChangedChannelObject.compareResponse, fakeResponse.message.text);
        });
    });

    describe('#route', function() {
        it('route true', function() {
            assert.equal(MessageChangedChannel.route(fakeResponse), true);
        });
        it('route some message', function() {
            assert.equal(MessageChangedChannel.route(fakeResponse.message = ''), false);
        });
    });
});
