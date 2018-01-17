/**
 * Driver in buffer
 * @type {module.BufferDriverCache}
 */
module.exports = class BufferDriverCache{
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
        return this.buffer[key] = value;
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