const SlackBot = require('slackbots');
const Route = require('./Controllers/routes');

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
     * return id bot
     * @return {PromiseLike<T> | Promise<T>}
     */
    get botId(){
       return this.getUser(this.name).then( user => {
           return user.id;
       })
    }
    /**
     *
     * @param message object
     */
    async managerTypeMessages(message){
        let classMessage = Route(message, this);
        if(classMessage && classMessage !== null) {
            this.emit(classMessage.typeEvent, classMessage);
        }
    }
};


