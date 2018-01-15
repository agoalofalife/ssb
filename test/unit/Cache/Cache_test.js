const Cache = require('./../../../Cache/Cache');
const BufferDriverCache = require('./../../../Cache/Drivers/BufferDriverCache');

const faker = require('faker');
const assert = require('assert');
const sinon = require('sinon');

describe('Cache class', () => {
    let cacheObject = new Cache();
    let messageEvent = {
        channel:'GUPDP34',
    };
    let DriverCache = new BufferDriverCache();

    describe('cache route method', () => {
        it('should return value after call function pass third arguments', function () {
            let random = faker.random.uuid();
            let random1 = faker.random.uuid();
            let random2 = faker.random.uuid();

            // assert.equal(cacheObject.route(messageEvent, DriverCache, (...expectedValues) => {
            //     console.log(...expectedValues, 'expectedValues');
            //     expectedValues.forEach((value) => {
            //         assert.equal(expectedValues, random, random1, random2);
            //     });
            //     // assert.equal(expectedValues, random, random1, random2);
            //     return random;
            // }, random, random1, random2), random);
        });
    });
});