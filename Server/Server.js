require('../setting/color');
require('dotenv').config();
const express = require('express');
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json({ type: 'application/*+json' }));
app.use(bodyParser.urlencoded({extended : true}));

const singleton = Symbol();
const singletonEnforcer = Symbol();

/**
 * Singleton class
 * @type {module.Server}
 */
module.exports = class Server {
    /**
     *
     * @param enforcer
     */
    constructor(enforcer){
        if(enforcer !== singletonEnforcer) throw new Error("Cannot construct singleton");

        // singleton server
        let port = process.env.PORT_SERVER || 9000;
        console.log('Server start, port :'.info, port);

        this.app = app;

        this.nativeServer = this.app.listen(port);
    }

    /**
     *
     * @return {*|app|{configurable, enumerable, writable, value}}
     */
    static get instance() {
        if(!this[singleton]) {
            this[singleton] = new Server(singletonEnforcer);
        }
        return this[singleton];
    }
};