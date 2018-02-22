const RouteClass = require('../../../src/route/Route');
const assert = require('assert');
const faker = require('faker');
const Route = new RouteClass();
const sinon = require('sinon');

let word = faker.random.word();
let MessageFake = {
    response:word,
    compareResponse : word,
    isMention: () => {
        return new Promise((resolve, reject) => {
            resolve(true)
        });
    }
};

describe('Route', function() {
    describe('#route', function() {
        it('return function', function() {
            assert.equal(typeof Route.route(MessageFake) === 'function', true);
        });
        it('expected return message and classMessage when regexp string', function() {
            let route = Route.route(MessageFake);
            const callback = sinon.spy();

            route(MessageFake.compareResponse, callback);
            assert(callback.calledWith(MessageFake.response, MessageFake));
        });
        it('expected return message and classMessage when regexp not string and not match', function() {
            MessageFake.compareResponse = 'random';
            let route = Route.route(MessageFake);

            const callback = sinon.spy();
            route(/test/, callback);
            assert(callback.notCalled);
            MessageFake.compareResponse = MessageFake.response;
        });
        it('expected return message and classMessage when regexp not string and math', function() {
            MessageFake.compareResponse = 'test';
            let route = Route.route(MessageFake);

            const callback = sinon.spy();
            route(/test/, callback);
            assert(callback.calledOnce);
            MessageFake.compareResponse = MessageFake.response;
        });
    });
    describe('#routeMention', function() {
        it('return function', async function() {
            assert.equal(typeof await Route.routeMention(MessageFake) === 'function', true);
        });
        it('expected return message and classMessage', async function() {
            let route = await Route.routeMention(MessageFake);

            route(MessageFake.compareResponse, function (message, classMessage) {
                assert.equal(message, MessageFake.compareResponse);
                assert.deepEqual(classMessage, MessageFake);
            });
        });
    });
});