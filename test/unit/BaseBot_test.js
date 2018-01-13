const BaseBotClass = require('../../BaseBot');
const faker = require('faker');
const assert = require('assert');
const ChannelMessage = require('./../../Messages/MessageBase/ChannelMessage');
const PrivateChannelOrMPDM = require('./../../Messages/MessageBase/PrivateChannelOrMPDM');
const sinon  = require('sinon');
let team_id = faker.random.uuid();

class FakeBaseBot extends BaseBotClass{
    constructor(params){
        super(params);
        this.team = {id:team_id};
    }

    login(){}
    getUser(name, error){
        return new Promise((resolve, reject) => {
            if (name === 'error'){
                reject();
            }
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
    describe('#botId return error getUser function', function() {
        it('return error in out console.log()', async function() {
            const BaseBotObject = new FakeBaseBot({token:'token', name:'error'});

            let spy = sinon.spy(console, 'log');
            await BaseBotObject.getBotId();
            assert(spy.calledWith('Error name slack bot!'.error));
            spy.restore();
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
        it('return 401 after fail verify', function() {
            let uuid = faker.random.uuid();
            let server = {
                instance :{
                    app:{
                        post(route, cb) {
                            assert.equal(typeof cb === 'function', true);
                            assert.equal(route, '/conversation');
                            cb.call(this, {
                                body:{
                                    token:uuid,
                                    payload:'{"test":"test"}'
                                }
                            },  {
                                status:function (status) {
                                    assert.equal(status, 401);
                                }
                            })
                        }
                    },
                }
            };
            // BaseBotObject.on('conversation', (fnRoute, outuuid) => {
            //     assert.equal(uuid, outuuid);
            //     assert.equal(typeof fnRoute === 'function', true);
            // });
            BaseBotObject.parentListenConversation(server);
        });
        it('return 200 after success verify', function() {
            let uuid = faker.random.uuid();
            let server = {
                instance :{
                    app:{
                        post(route, cb) {
                            assert.equal(typeof cb === 'function', true);
                            assert.equal(route, '/conversation');
                            cb.call(this, {
                                body:{
                                    payload:`{"token":"${process.env.SLACK_VERIFICATION_TOKEN}"}`
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
        it('test listenCommands method return status 401', function() {
            let server = {
                instance :{
                  app :{
                      post(route, cb) {
                          assert.equal(typeof cb === 'function', true);
                          assert.equal(route, '/commands');
                          cb.call(this, {
                              body:{
                                  token:'',
                                  team_id:team_id
                              },
                          }, {
                              status:function (status) {
                                  assert.equal(status, 401);
                              }
                          })
                      }
                  }
                }
            };
            BaseBotObject.parentListenCommands(server);
        });
        it('test listenCommands method return status 200', function() {
            let uuid = faker.random.uuid();
            let server = {
                instance :{
                    app :{
                        post(route, cb) {
                            assert.equal(typeof cb === 'function', true);
                            assert.equal(route, '/commands');
                            cb.call(this, {
                                body:{
                                    token:process.env.SLACK_VERIFICATION_TOKEN,
                                    team_id:team_id
                                },
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