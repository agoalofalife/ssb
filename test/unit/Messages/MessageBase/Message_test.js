const assert = require('assert');
const Message = require('../../../../src/Messages/MessageBase/Message');
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
    postMessage() {
        return new Promise(resolve => {
            resolve(randomFaker)
        })
    },
    postEphemeral(){
        return new Promise(resolve => {
            resolve(randomFaker)
        })
    }
};

let fakeResponse = {
    user:faker.name.firstName,
    type:'message',
    text:faker.lorem.text(),
    channel:faker.random.number(),

};

let MessageObject = new Message(fakeResponse, SlackBotFake);

describe('Message', function() {
    describe('#reply', function() {
        it('reply', async function() {
            let result = await MessageObject.reply(faker.lorem.word(), {});
            assert.equal(result, randomFaker);
        });
    });
    describe('#replyInThread', function() {
        it('reply', async function() {
            let result = await MessageObject.replyInThread(faker.lorem.word(), {});
            assert.equal(result, randomFaker);
        });
    });

    describe('#replyEphemeral', function() {
        it('replyEphemeral', async function() {
            let result = await MessageObject.replyEphemeral(faker.lorem.word(), {});
            assert.equal(result, randomFaker);
        });
    });
});
