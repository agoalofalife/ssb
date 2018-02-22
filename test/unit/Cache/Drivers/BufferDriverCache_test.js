const BufferDriverCache = require('../../../../src/Cache/Drivers/BufferDriverCache');
const assert = require('assert');
const faker = require('faker');



describe('Driver Cache BufferDriverCache', () => {
    let BufferDriverCacheObject = new BufferDriverCache();
   describe('method "is"', () => {
       it('if empty buffer should return false', () => {
           assert.equal(BufferDriverCacheObject.is(faker.random.uuid()), false);
       });
       it('method "is" if buffer not empty', () => {
           let uuid = faker.random.uuid();
           BufferDriverCacheObject.save(uuid, faker.random.number());
           assert.equal(BufferDriverCacheObject.is(uuid), true);
       });
    });

    describe('method "save"', () => {
        it('method "save"', () => {
            let uuid = faker.random.uuid();
            let random = faker.random.number();
            assert.equal( BufferDriverCacheObject.save(uuid, random), random);
        });

        it('method "save" after save', () => {
            let uuid = faker.random.uuid();
            BufferDriverCacheObject.save(uuid, faker.random.number());
            assert.equal(BufferDriverCacheObject.is(uuid), true);
        });
    });

    describe('method "get"', () => {
        it('method "get" if not value', () => {
            let uuid = faker.random.uuid();
            assert.equal(BufferDriverCacheObject.get(uuid), undefined);
        });
        it('method "get" if value exist', () => {
            let uuid = faker.random.uuid();
            let random = faker.random.number();
            BufferDriverCacheObject.save(uuid, random);
            assert.equal(BufferDriverCacheObject.get(uuid), random);
        });
    });

    describe('method "remove"', () => {
        it('remove not exist value, should return false', () => {
            assert.equal(BufferDriverCacheObject.remove(faker.random.uuid()), false);
        });
        it('remove exist value, should return true', () => {
            let uuid = faker.random.uuid();
            let random = faker.random.number();
            BufferDriverCacheObject.save(uuid, random);
            assert.equal(BufferDriverCacheObject.remove(uuid), true);
        });
    });
});