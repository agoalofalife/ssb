const Server = require('./../../../Server/Server');
const assert = require('assert');

describe('Server', function() {
    describe('#Singleton check', function () {
        it('equal object', function () {
            assert.equal(Server.instance, Server.instance);
            Server.instance.nativeServer.close();
        });
    });
});
