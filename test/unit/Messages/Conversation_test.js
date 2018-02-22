const assert = require('assert');
const Conversation = require('../../../src/Messages/Conversation');
const faker = require('faker');

let SlackBotFake = {

};
let fakeResponse = {
    callback_id:faker.random.uuid(),
    token:process.env.SLACK_VERIFICATION_TOKEN
};

let conversationObject = new Conversation(fakeResponse, SlackBotFake);

describe('Conversation', function() {
    describe('#typeEvent', function() {
        it('exist property typeEvent and return string type', function() {
            assert.equal(conversationObject.typeEvent, 'conversation');
        });
    });
    describe('#descriptionEvent', function() {
        it('exist property typeEvent and return string type', function() {
            assert.equal(conversationObject.descriptionEvent, 'The event occurs when it was sent interactive message');
        });
    });

    describe('#compareResponse', function() {
        it('get text from response callback_id', function() {
            assert.equal(conversationObject.compareResponse, fakeResponse.callback_id);
        });
    });

    describe('#verify', function() {
        it('verify method', function() {
            assert.equal(conversationObject.verify(), true);
        });
    });
});
