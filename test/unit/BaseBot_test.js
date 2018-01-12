const BaseBotClass = require('../../BaseBot');
const faker = require('faker');
const assert = require('assert');
let name = faker.name.firstName();
let randomId = faker.random.uuid();
const ChannelMessage = require('./../../Messages/MessageBase/ChannelMessage');
const PrivateChannelOrMPDM = require('./../../Messages/MessageBase/PrivateChannelOrMPDM');

class FakeBaseBot extends BaseBotClass{
    constructor(params){
        super(params)
    }
    login(){}
    getUser(name){
        return new Promise(resolve => {
          resolve({
             id:randomId
            });
        })
    }
    listenConversation(){}
    listenCommands(){}
}
const BaseBotObject = new FakeBaseBot({token:'token', name:name});

let fakeResponse = {
    user:faker.name.firstName,
    type:'message',
    text:faker.lorem.text(),
    channel:`${ChannelMessage.firstLetter()}${faker.random.number()}`,
};

describe('BaseBot', function() {
    describe('#botId', function() {
        it('return id', async function() {
            let id = await BaseBotObject.getBotId();
            assert.equal(id, randomId);

            // get cache
            let idCache = await BaseBotObject.getBotId();
            assert.equal(id, idCache);
        });
    });
    describe('#managerTypeMessages', function() {
        it('standart', async function() {
            BaseBotObject.on('message.channels', function (route) {
                assert.equal(typeof route === 'function', true);
            });
            await BaseBotObject.managerTypeMessages(fakeResponse);
        });
        it('id type event array', async function() {
            fakeResponse.channel = `${PrivateChannelOrMPDM.firstLetter()}${faker.random.number()}`;
            // get type event from PrivateChannelOrMPDM object and random
            BaseBotObject.on('message.mpim', function (route) {
                assert.equal(typeof route === 'function', true);
            });
            await BaseBotObject.managerTypeMessages(fakeResponse);
        });
    });
});