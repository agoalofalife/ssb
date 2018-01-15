const Cache = require('./../../../Cache/Cache');
const BufferDriverCache = require('./../../../Cache/Drivers/BufferDriverCache');

const faker = require('faker');
const assert = require('assert');
const sinon = require('sinon');
const _ = require('lodash');

describe('Cache class', () => {
    let cacheObject = new Cache();
    let messageEvent = {
        channel:'GUPDP34',
    };

    describe('cache route method', () => {
        let random = faker.random.uuid();
        let random1 = faker.random.uuid();
        let random2 = faker.random.uuid();
        it('should return value after call function pass third arguments', function () {
            let DriverCache = new BufferDriverCache();

            assert.equal(cacheObject.route(messageEvent, DriverCache, (...expectedValues) => {
                assert.equal(_.isEqual(expectedValues.sort(), [random, random1, random2].sort()), true);
                return random;
            }, random, random1, random2), random);
        });
        it('should return cache', function () {
            let DriverCache = new BufferDriverCache();
            cacheObject.route(messageEvent, DriverCache, (...expectedValues) => {
                assert.equal(_.isEqual(expectedValues.sort(), [random, random1, random2].sort()), true);
                return random2;
            }, random, random1, random2);
            let callback = sinon.spy();

            assert.equal(cacheObject.route(messageEvent, DriverCache, callback, random, random1, random2), random2);
            assert(callback.notCalled)
        });
    });
});