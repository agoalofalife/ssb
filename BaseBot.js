require('dotenv').config();

const SlackBot = require('slackbots');
const {router} = require('./route/routes');
const RouteClass = require('./route/Route');
const Server = require('./Server/Server');
const Conversation = require('./Messages/Conversation');
const Command = require('./Messages/Command');

module.exports = class BaseBot extends SlackBot {
    /**
     *
     * @param params
     */
    constructor(params) {
        super(params);
        this.on('message', this.managerTypeMessages);

        // define property...
        this.botId = null;
        this.Route = new RouteClass();

        // server processes run listen..
        this.listenConversation(Server);
        this.listenCommands(Server);
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
                try {
                    let user = await this.getUser(this.name);
                    this.botId = user.id;
                    return user.id;
                } catch (err) {
                    console.log('Error name slack bot!');
                }
            }
        }.bind(this)();
    }

    /**
     *
     * @param message object
     */
    async managerTypeMessages(message) {
        let classMessage = router(message, this);

        // if route found
        if (classMessage && classMessage !== null) {

            let fnRoute = this.Route.route(classMessage, this);
            let fnRouteMention = await this.Route.routeMention(classMessage, this);

            if (Array.isArray(classMessage.typeEvent)) {
                classMessage.typeEvent.forEach((nameEvent) => {
                    this.emit(nameEvent, fnRoute, fnRouteMention);
                })
            } else {
                this.emit(classMessage.typeEvent, fnRoute, fnRouteMention);
            }
        }
    }

    /**
     * @link https://api.slack.com/internal-integrations
     */
    listenConversation(Server) {
        Server.instance.app.post('/conversation', (req, res) => {
            // todo hmmm...if key which 'payload' will changed ??
            let conversation = new Conversation(JSON.parse(req.body.payload), this);
            let fnRoute = this.Route.route(conversation, this);

            this.emit(conversation.typeEvent, fnRoute, res);
        });
    }

    /**
     * @link https://api.slack.com/slash-commands
     */
    listenCommands(Server) {
        Server.instance.app.post('/commands', (req, res) => {
            let command = new Command(req.body, this);
            let fnRoute = this.Route.route(command, this);

            this.emit(command.typeEvent, fnRoute, res);
        });
    }
};