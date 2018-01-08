const SlackBot = require('slackbots');
const routes = require('./route/routes');
const RouteClass = require('./route/Route');

module.exports = class BaseBot extends SlackBot{
    /**
     *
     * @param params
     */
    constructor(params) {
        super(params);
        this.on('message', this.managerTypeMessages);

        // define property...
        this.botId = null;
    }

    /**
     * return id bot
     * @return
     */
     async getBotId() {
         return async function () {
             if (this.botId !== null) {
                 return this.botId;
             } else {
                 let user = await this.getUser(this.name);
                 this.botId = user.id;
                 return user.id;
             }
         }.bind(this)();
    }
    /**
     *
     * @param message object
     */
    async managerTypeMessages(message){
        let classMessage = routes(message, this);
        let Route = new RouteClass();
        // if route found
        if (classMessage && classMessage !== null) {

            let fnRoute = Route.route(classMessage, this);
            let fnRouteMention = await Route.routeMention(classMessage, this);

            if (Array.isArray(classMessage.typeEvent)) {
                classMessage.typeEvent.forEach((nameEvent) => {
                    this.emit(nameEvent, fnRoute, fnRouteMention);
                })
            } else{
                this.emit(classMessage.typeEvent, fnRoute, fnRouteMention);
            }
        }
    }
};


