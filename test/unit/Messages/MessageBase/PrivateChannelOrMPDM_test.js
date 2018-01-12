const assert = require('assert');
const PrivateChannelOrMPDM = require('./../../../../Messages/MessageBase/PrivateChannelOrMPDM');
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
    channel:`${PrivateChannelOrMPDM.firstLetter()}${faker.random.number()}`,

};

let PrivateChannelOrMPDMObject = new PrivateChannelOrMPDM(fakeResponse, SlackBotFake);

describe('PrivateChannelOrMPDM', function() {
    describe('#typeEvent', function() {
        it('exist property typeEvent and return string type', function() {
            assert.deepEqual(PrivateChannelOrMPDMObject.typeEvent, ['message.groups', 'message.mpim']);
        });
    });
    describe('#descriptionEvent', function() {
        it('equal description', function() {
            assert.equal(PrivateChannelOrMPDMObject.descriptionEvent, 'The event occurs when a message arrives in private channel or multi direct-group');
        });
    });

    describe('#firstLetter', function() {
        it('exist method firstLetter and return string letter `G`', function() {
            assert.equal(PrivateChannelOrMPDM.firstLetter(), 'G');
        });
    });
    describe('#getResponse', function() {
        it('get text from response', function() {
            assert.equal(PrivateChannelOrMPDMObject.compareResponse, fakeResponse.text);
        });
    });
    describe('#route', function() {
        it('route true', function() {
            assert.equal(PrivateChannelOrMPDM.route(fakeResponse), true);
        });
        it('route some message', function() {
            assert.equal(PrivateChannelOrMPDM.route(fakeResponse.message = ''), false);
        });
    });
    describe('#reply', function() {
        it('reply', async function() {
            let result = await PrivateChannelOrMPDMObject.reply(faker.lorem.word(), {});
            assert.equal(result, randomFaker);
        });
    });
    describe('#patternMention', function() {
        it('exist function', function() {
            assert.equal(typeof  PrivateChannelOrMPDMObject.patternMention === 'function', true);
        });
    });
    describe('#isMention', function() {
        it('exist function', function() {
            assert.equal(typeof  PrivateChannelOrMPDMObject.isMention === 'function', true);
        });
    });
});
