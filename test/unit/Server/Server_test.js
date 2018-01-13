const Server = require('./../../../Server/Server');
const assert = require('assert');
const faker = require('faker');
// const expect = require('expect');

describe('Server', function() {
    describe('#Singleton check', function () {
        it('equal object', function () {
            assert.equal(Server.instance, Server.instance);
            Server.instance.nativeServer.close();
        });
        it('expected throw', function () {
            assert.throws(() => { new Server(faker.random.uuid()) }, Error, "Cannot construct singleton");
        });
    });
});
