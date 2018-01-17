const assert = require('assert');
const MessageChangedMultipartDirect = require('../../../../../Messages/MessageSubType/MessageChanged/MessageChangedMultipartDirect');
const faker = require('faker');

let randomFaker = faker.random.uuid();
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
    channel:`${MessageChangedMultipartDirect.firstLetter()}${faker.random.number()}`,

};

let MessageChangedMultipartDirectObject = new MessageChangedMultipartDirect(fakeResponse, SlackBotFake);

describe('MessageChangedMultipartDirect', function() {
    describe('#typeEvent', function() {
        it('exist property typeEvent and return string type', function() {
            assert.equal(MessageChangedMultipartDirectObject.typeEvent, 'message_changed.message.mpim');
        });
    });
    describe('#typeEvent', function() {
        it('exist property typeEvent and return string type', function() {
            assert.equal(MessageChangedMultipartDirectObject.descriptionEvent, 'The event occurs when a message was changed in multi direct-group');
        });
    });
    describe('#compareResponse', function() {
        it('get text from response', function() {
            assert.equal(MessageChangedMultipartDirectObject.compareResponse, fakeResponse.message.text);
        });
    });

    describe('#route', function() {
        it('route true', async function() {
            assert.equal(await MessageChangedMultipartDirect.route(fakeResponse, SlackBotFake), true);
        });
        it('route some message', async function() {
            assert.equal(await MessageChangedMultipartDirect.route(fakeResponse.channel = '', SlackBotFake), false);
        });
    });
});
