const assert = require('assert');
const MultipartDirectMessage = require('./../../../../Messages/MessageBase/MultipartDirectMessage');
const BaseBot = require('./../../../../BaseBot');
const faker = require('faker');
const sinon = require('sinon');

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
    channel:`${MultipartDirectMessage.firstLetter()}${faker.random.number()}`,

};

let MultipartDirectMessageObject = new MultipartDirectMessage(fakeResponse, SlackBotFake);

describe('PrivateChannelMessage', function() {
    describe('#typeEvent', function() {
        it('exist property typeEvent and return string type', function() {
            assert.deepEqual(MultipartDirectMessageObject.typeEvent, 'message.mpim');
        });
    });
    describe('#descriptionEvent', function() {
        it('equal description', function() {
            assert.equal(MultipartDirectMessageObject.descriptionEvent, 'The event occurs when a message arrives in multi direct-group');
        });
    });

    describe('#firstLetter', function() {
        it('exist method firstLetter and return string letter `G`', function() {
            assert.equal(MultipartDirectMessage.firstLetter(), 'G');
        });
    });
    describe('#compareResponse', function() {
        it('get text from response', function() {
            assert.equal(MultipartDirectMessageObject.compareResponse, fakeResponse.text);
        });
    });
    describe('#route', function() {
        it('route true', async function() {
            assert.equal(await MultipartDirectMessage.route(fakeResponse), false);
        });
        it('route some message', async function() {
            assert.equal(await MultipartDirectMessage.route(fakeResponse.message = ''), false);
        });
        it('route return group id', async function() {
            let isMatch = await MultipartDirectMessage.route(fakeResponse, {
                getGroupMultiDirectById:sinon.stub().returns(42)
            });
            assert.equal(isMatch, false);
        });
    });
});
