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
    }

    /**
     * return id bot
     * @return
     */
     async botId() {
         let cache = null;
         return async function () {
             if (cache !== null) {
                 return cache;
             } else {
                 let user = await this.getUser(this.name);
                 cache = user.id;
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
        if(classMessage && classMessage !== null) {
            let fnRoute = Route.route(message, classMessage, this);
            let fnRouteMention = await Route.routeMention(message, classMessage, this);

            if (Array.isArray(classMessage.typeEvent)) {
                classMessage.typeEvent.forEach((nameEvent) => {
                    this.emit(nameEvent, fnRoute, fnRouteMention);
                })
            } else{
                this.emit(classMessage.typeEvent, fnRoute, fnRouteMention);
            }
        }
    }

    conversation(){
        // this._api('conversation.create')
    }
};


