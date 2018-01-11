require('../setting/color');
require('dotenv').config();
const express = require('express');
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended : true}));

class Server {
    constructor(){
        // singleton server
        let port = process.env.PORT_SERVER || 9000;
        console.log('Server start, port :'.info, port);
        this.app = app;
        this.app.listen(port);
    }
}

module.exports = new Server();