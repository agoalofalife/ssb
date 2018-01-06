const SlackBot = require('slackbots');
const Route = require('./Messages/routes');

module.exports = class BaseBot extends SlackBot{
    /**
     *
     * @param params
     */
    constructor(params) {
        super(params);
        this.on('message', this.managerTypeMessages);

        // define property
    }

    /**
     *
     * @param message object
     */
    async managerTypeMessages(message){
        let classMessage = Route(message);
        if(classMessage !== null) {
            this.emit(classMessage.typeEvent, classMessage);
        }
    }
};


