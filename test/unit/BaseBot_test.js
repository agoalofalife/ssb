const BaseBotClass = require('../../BaseBot');
const faker = require('faker');
const assert = require('assert');
const ChannelMessage = require('./../../Messages/MessageBase/ChannelMessage');
const PrivateChannelOrMPDM = require('./../../Messages/MessageBase/PrivateChannelOrMPDM');

const Server = require('../../Server/Server');
class FakeBaseBot extends BaseBotClass{
    constructor(params){
        super(params);
    }
    login(){}
    getUser(name){
        return new Promise(resolve => {
          resolve({
             id:randomId
            });
        })
    }
    listenConversation(Server){}
    listenCommands(Server){}

    parentListenConversation(Server){
        super.listenConversation(Server)
    }
    parentListenCommands(Server){
        super.listenCommands(Server)
    }
}

let name = faker.name.firstName();
let randomId = faker.random.uuid();
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
    describe('#listenConversation', function() {
        it('test listenConversation method', function() {
            let uuid = faker.random.uuid();
            let server = {
                instance :{
                    app:{
                        post(route, cb) {
                            assert.equal(typeof cb === 'function', true);
                            assert.equal(route, '/conversation');
                            cb.call(this, {
                                body:{
                                    payload:'{"test":"test"}'
                                }
                            }, uuid)
                        }
                    },
                }
            };
            BaseBotObject.on('conversation', (fnRoute, outuuid) => {
                assert.equal(uuid, outuuid);
                assert.equal(typeof fnRoute === 'function', true);
            });
            BaseBotObject.parentListenConversation(server);
        });
    });
    describe('#listenCommands', function() {
        it('test listenCommands method', function() {
            let uuid = faker.random.uuid();
            let server = {
                instance :{
                  app :{
                      post(route, cb) {
                          assert.equal(typeof cb === 'function', true);
                          assert.equal(route, '/commands');
                          cb.call(this, {
                              body:{}
                          }, uuid)
                      }
                  }
                }
            };
            BaseBotObject.on('command', (fnRoute, outuuid) => {
                assert.equal(uuid, outuuid);
                assert.equal(typeof fnRoute === 'function', true);
            });
            BaseBotObject.parentListenCommands(server);
        });
    });
});