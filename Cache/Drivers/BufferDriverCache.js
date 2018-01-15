/**
 * Driver in buffer
 * @type {module.BufferDriverCache}
 */
module.exports = class BufferDriverCache{

    // todo there is one question
    // todo do I need to send the key designer not to duplicate other methods?
    constructor(){
        this.buffer = {};
    }

    /**
     * to check the value for the key
     * @param key
     * @return {boolean}
     */
    is(key){
        return this.buffer[key] !== undefined;
    }

    /**
     * Get value in key
     * @param key
     * @return value or undefined
     */
    get(key){
        return this.buffer[key];
    }
    /**
     * Save new value or update
     * @param key
     * @param value
     * @return {*}
     */
    save(key, value){
        this.buffer[key] = value;
        return this.buffer[key];
    }

    /**
     * Remove cache
     * @param key
     * @return {boolean}
     */
    remove(key){
        if(this.buffer[key] === undefined) return false;
        return delete this.buffer[key], true;
    }
};