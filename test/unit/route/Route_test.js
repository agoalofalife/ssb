const RouteClass = require('./../../../route/Route');
const assert = require('assert');
const faker = require('faker');
const Route = new RouteClass();

let MessageFake = {
    getResponse : faker.random.word(),
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
        it('expected return message and classMessage', function() {
            let route = Route.route(MessageFake);
            route(MessageFake.getResponse, function (message, classMessage) {
                assert.equal(message, MessageFake.getResponse);
                assert.deepEqual(classMessage, MessageFake);
            });
        });
    });
    describe('#routeMention', function() {
        it('return function', async function() {
            assert.equal(typeof await Route.routeMention(MessageFake) === 'function', true);
        });
        it('expected return message and classMessage', async function() {
            let route = await Route.routeMention(MessageFake);

            route(MessageFake.getResponse, function (message, classMessage) {
                assert.equal(message, MessageFake.getResponse);
                assert.deepEqual(classMessage, MessageFake);
            });
        });
    });
});