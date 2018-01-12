const assert = require('assert');
const Command = require('./../../../Messages/Command');
const faker = require('faker');

let SlackBotFake = {};
let fakeResponse = {
    command:faker.random.uuid()
};

let commandObject = new Command(fakeResponse, SlackBotFake);

describe('Command', function() {
    describe('#typeEvent', function() {
        it('exist property typeEvent and return string type', function() {
            assert.equal(commandObject.typeEvent, 'command');
        });
    });
    describe('#descriptionEvent', function() {
        it('exist property typeEvent and return string type', function() {
            assert.equal(commandObject.descriptionEvent, 'The event occurs when was sent a message with the type "command"');
        });
    });

    describe('#compareResponse', function() {
        it('get text from response', function() {
            assert.equal(commandObject.compareResponse, fakeResponse.command);
        });
    });
});
