const assert = require('assert');
const Command = require('./../../../Messages/Command');
const faker = require('faker');

let team_id = faker.random.number();
let SlackBotFake = {
    team:{id:team_id}
};
let fakeResponse = {
    command:faker.random.uuid(),
    token: process.env.SLACK_VERIFICATION_TOKEN,
    team_id:team_id,
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
    describe('#verify', function() {
        it('verify method', function() {
            assert.equal(commandObject.verify(), true);
        });
    });
});
