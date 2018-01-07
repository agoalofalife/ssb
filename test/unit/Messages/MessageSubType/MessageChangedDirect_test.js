const assert = require('assert');
const MessageChangedDirect = require('./../../../../Messages/MessageSubType/MessageChangedDirect');
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
    channel:`${MessageChangedDirect.firstLetter()}${faker.random.number()}`,

};

let MessageChangedDirectObject = new MessageChangedDirect(fakeResponse, SlackBotFake);

describe('ChannelMessage', function() {
    describe('#typeEvent', function() {
        it('exist property typeEvent and return string type', function() {
            assert.equal(MessageChangedDirectObject.typeEvent, 'message_changed.message.im');
        });
    });
    describe('#getResponse', function() {
        it('get text from response', function() {
            assert.equal(MessageChangedDirect.getResponse, fakeResponse.text);
        });
    });

    describe('#route', function() {
        it('route true', function() {
            assert.equal(MessageChangedDirect.route(fakeResponse), true);
        });
        it('route some message', function() {
            assert.equal(MessageChangedDirect.route(fakeResponse.message = ''), false);
        });
    });
});
